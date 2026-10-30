import { randomUUID } from "crypto";
import Campaign from "@/models/Campaign";
import BroadcastMessage from "@/models/BroadcastMessage";
import { sendEmail, createBulkTransporter } from "@/utils/emailService";

/**
 * HOW BULK SENDING WORKS
 * ----------------------
 * 1. When an admin clicks "Send", a Campaign document is saved in MongoDB with
 *    one entry per recipient (status "pending"). Nothing is emailed yet.
 * 2. The admin's browser then repeatedly calls
 *    POST /api/admin/broadcast/campaigns/:id/send
 *    Each call sends a small chunk of emails (for at most ~TIME_BUDGET_MS) and
 *    returns progress. The browser keeps calling until nothing is left.
 *    Because each request is short, it never hits server/hosting timeouts —
 *    which is what used to break large broadcasts.
 * 3. Every recipient is "claimed" atomically before sending, so two requests
 *    running at the same time can never email the same person twice.
 * 4. Temporary SMTP errors (e.g. rate limits) are retried up to MAX_RETRIES
 *    times. Permanent errors (e.g. invalid mailbox) are marked "failed".
 * 5. If the browser is closed mid-way, the campaign stays "pending" and can be
 *    resumed from the Broadcast History tab (or by the optional cron endpoint).
 */

const MAX_RETRIES = 3;
// A recipient stuck in "processing" this long means the request was killed
// mid-send. Requests are capped well below this, so it is safe.
const STALE_PROCESSING_MS = 5 * 60 * 1000;
// How long a single HTTP request may spend sending before returning.
export const DEFAULT_TIME_BUDGET_MS = 15 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * DAILY SENDING LIMIT
 * -------------------
 * Hostinger allows EMAIL_DAILY_LIMIT (default 1000) emails per rolling 24 hours
 * for the whole mailbox. Broadcasts may only use (limit - reserve), so that
 * EMAIL_DAILY_RESERVE (default 100) emails are always left for appointment
 * confirmations, contact-form emails, password resets, etc.
 * When the broadcast allowance is used up, sending pauses (nothing is marked
 * failed) and the admin can click "Resume sending" once allowance frees up.
 */
function readInt(value, fallback) {
  const n = parseInt(value, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function getQuotaSettings() {
  const limit = readInt(process.env.EMAIL_DAILY_LIMIT, 1000) || 1000;
  const reserve = Math.min(readInt(process.env.EMAIL_DAILY_RESERVE, 100), limit);
  return { limit, reserve, budget: limit - reserve };
}

/** How many broadcast emails were sent in the last 24h and how many remain. */
export async function getBroadcastQuota() {
  const { limit, reserve, budget } = getQuotaSettings();
  const since = new Date(Date.now() - DAY_MS);

  const [campaignAgg, legacyAgg] = await Promise.all([
    Campaign.aggregate([
      { $match: { "recipients.sentAt": { $gte: since } } },
      { $unwind: "$recipients" },
      { $match: { "recipients.sentAt": { $gte: since } } },
      { $group: { _id: null, count: { $sum: 1 }, oldest: { $min: "$recipients.sentAt" } } },
    ]),
    // Broadcasts sent by the older (pre-campaign) system, if any in the window.
    BroadcastMessage.aggregate([
      { $match: { createdAt: { $gte: since }, sent: { $gt: 0 } } },
      { $group: { _id: null, count: { $sum: "$sent" }, oldest: { $min: "$createdAt" } } },
    ]),
  ]);

  const sentLast24h = (campaignAgg[0]?.count || 0) + (legacyAgg[0]?.count || 0);
  const oldestDates = [campaignAgg[0]?.oldest, legacyAgg[0]?.oldest].filter(Boolean).map((d) => new Date(d).getTime());
  const oldest = oldestDates.length ? Math.min(...oldestDates) : null;

  return {
    limit,
    reserve,
    budget,
    sentLast24h,
    remaining: Math.max(budget - sentLast24h, 0),
    // When the oldest counted email drops out of the 24h window (allowance starts freeing up).
    resetsAt: oldest ? new Date(oldest + DAY_MS) : null,
  };
}

/**
 * True when the SMTP server says WE have hit a sending limit (as opposed to a
 * problem with one recipient, e.g. their mailbox being full).
 */
function isProviderLimitError(error) {
  const text = `${error?.response || ""} ${error?.message || ""}`;
  if (/mailbox|over quota|user quota|5\.2\.2|storage/i.test(text)) return false;
  return /(rate|sending|send|daily|hourly|message|outgoing)[\s-]*(limit|quota)|too many (messages|emails|mails|recipients)|limit (exceeded|reached)|quota (exceeded|reached)/i.test(text);
}

function errorMessage(error) {
  return String(error?.message || "Email delivery failed").slice(0, 500);
}

function isTemporaryEmailError(error) {
  const code = Number(error?.responseCode);
  if (Number.isFinite(code) && code >= 400 && code < 500) return true;

  return ["ETIMEDOUT", "ECONNRESET", "ECONNREFUSED", "EAI_AGAIN", "ESOCKET", "ECONNECTION", "ETLS", "EDNS"]
    .includes(error?.code);
}

function retryAt(retryCount) {
  // 30 seconds, 2 minutes, then 5 minutes.
  const seconds = [30, 120, 300][Math.min(retryCount - 1, 2)];
  return new Date(Date.now() + seconds * 1000);
}

async function markStaleClaimsFailed(campaignId) {
  const cutoff = new Date(Date.now() - STALE_PROCESSING_MS);
  const filter = {
    status: { $in: ["pending", "processing"] },
    recipients: { $elemMatch: { status: "processing", processingStartedAt: { $lt: cutoff } } },
  };
  if (campaignId) filter._id = campaignId;

  const campaigns = await Campaign.find(filter).select("_id recipients._id recipients.status recipients.processingStartedAt").lean();

  for (const campaign of campaigns) {
    const staleRecipients = campaign.recipients.filter(
      (recipient) => recipient.status === "processing" && recipient.processingStartedAt < cutoff,
    );

    for (const recipient of staleRecipients) {
      // Do not resend an email whose SMTP outcome is unknown after an interrupted worker.
      await Campaign.updateOne(
        {
          _id: campaign._id,
          recipients: {
            $elemMatch: {
              _id: recipient._id,
              status: "processing",
              processingStartedAt: { $lt: cutoff },
            },
          },
        },
        {
          $set: {
            "recipients.$.status": "failed",
            "recipients.$.error": "Delivery outcome unknown after worker interruption",
            "recipients.$.processingToken": null,
            "recipients.$.processingStartedAt": null,
            lastProcessedAt: new Date(),
          },
          $inc: { failedCount: 1, pendingCount: -1 },
        },
      );
    }

    await finishCampaignIfDone(campaign._id);
  }
}

async function claimRecipient(campaignId) {
  const now = new Date();
  const token = randomUUID();
  const campaign = await Campaign.findOneAndUpdate(
    {
      _id: campaignId,
      status: { $in: ["pending", "processing"] },
      recipients: {
        $elemMatch: {
          status: "pending",
          $or: [{ nextAttemptAt: null }, { nextAttemptAt: { $lte: now } }],
        },
      },
    },
    {
      $set: {
        status: "processing",
        lastProcessedAt: now,
        "recipients.$.status": "processing",
        "recipients.$.processingToken": token,
        "recipients.$.processingStartedAt": now,
      },
    },
    {
      new: true,
      // Only return the claimed recipient, not the whole (possibly huge) list.
      projection: {
        subject: 1,
        emailHtml: 1,
        delayBetweenEmailsMs: 1,
        recipients: { $elemMatch: { processingToken: token } },
      },
    },
  ).lean();

  if (!campaign) return null;
  const recipient = campaign.recipients?.[0];
  return recipient && recipient.processingToken === token ? { campaign, recipient, token } : null;
}

async function finishCampaignIfDone(campaignId) {
  await Campaign.updateOne(
    {
      _id: campaignId,
      status: { $in: ["pending", "processing"] },
      "recipients.status": { $nin: ["pending", "processing"] },
    },
    { $set: { status: "completed", completedAt: new Date(), lastProcessedAt: new Date() } },
  );
}

async function processCampaign(campaignId, { maxRecipients, deadline, transporter }) {
  let processed = 0;
  let providerLimitHit = false;

  while (processed < maxRecipients && Date.now() < deadline) {
    const claim = await claimRecipient(campaignId);
    if (!claim) break;
    processed += 1;

    const { campaign, recipient, token } = claim;
    const selector = {
      _id: campaign._id,
      recipients: { $elemMatch: { _id: recipient._id, status: "processing", processingToken: token } },
    };

    try {
      await sendEmail({ to: recipient.email, subject: campaign.subject, html: campaign.emailHtml }, transporter);
      await Campaign.updateOne(selector, {
        $set: {
          "recipients.$.status": "sent",
          "recipients.$.sentAt": new Date(),
          "recipients.$.error": null,
          "recipients.$.processingToken": null,
          "recipients.$.processingStartedAt": null,
          "recipients.$.nextAttemptAt": null,
          lastProcessedAt: new Date(),
        },
        $inc: { sentCount: 1, pendingCount: -1 },
      });
    } catch (error) {
      if (isProviderLimitError(error)) {
        // The mail server says our mailbox has hit its sending limit. Put this
        // recipient back in the queue untouched and pause the campaign.
        await Campaign.updateOne(selector, {
          $set: {
            "recipients.$.status": "pending",
            "recipients.$.processingToken": null,
            "recipients.$.processingStartedAt": null,
            lastProcessedAt: new Date(),
          },
        });
        console.error(`Campaign ${campaign._id}: mail server sending limit reached, pausing:`, errorMessage(error));
        providerLimitHit = true;
        break;
      }

      if (error?.code === "EAUTH") {
        // SMTP login rejected: this is a server configuration problem, not a
        // problem with this recipient. Put them back in the queue untouched and
        // stop, so nobody is wrongly marked as failed.
        await Campaign.updateOne(selector, {
          $set: {
            "recipients.$.status": "pending",
            "recipients.$.processingToken": null,
            "recipients.$.processingStartedAt": null,
          },
        });
        const configError = new Error(
          `The email server rejected the login (check EMAIL_USER / EMAIL_PASSWORD / SMTP_HOST): ${errorMessage(error)}`,
        );
        configError.isSmtpConfigError = true;
        throw configError;
      }

      const nextRetryCount = (recipient.retryCount || 0) + 1;
      const shouldRetry = isTemporaryEmailError(error) && nextRetryCount < MAX_RETRIES;
      const update = shouldRetry
        ? {
            $set: {
              "recipients.$.status": "pending",
              "recipients.$.error": errorMessage(error),
              "recipients.$.retryCount": nextRetryCount,
              "recipients.$.nextAttemptAt": retryAt(nextRetryCount),
              "recipients.$.processingToken": null,
              "recipients.$.processingStartedAt": null,
              lastProcessedAt: new Date(),
            },
          }
        : {
            $set: {
              "recipients.$.status": "failed",
              "recipients.$.error": errorMessage(error),
              "recipients.$.retryCount": nextRetryCount,
              "recipients.$.processingToken": null,
              "recipients.$.processingStartedAt": null,
              lastProcessedAt: new Date(),
            },
            $inc: { failedCount: 1, pendingCount: -1 },
          };
      await Campaign.updateOne(selector, update);
      console.error(
        `Campaign ${campaign._id}: email to ${recipient.email} failed (${shouldRetry ? "retry scheduled" : "terminal failure"}):`,
        errorMessage(error),
      );
    }

    const delayMs = campaign.delayBetweenEmailsMs || 0;
    if (delayMs && Date.now() + delayMs < deadline) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  await finishCampaignIfDone(campaignId);
  return { processed, providerLimitHit };
}

/** Summarise a campaign's current delivery state for the admin UI. */
export async function getCampaignProgress(campaignId) {
  const campaign = await Campaign.findById(campaignId)
    .select("status totalRecipients sentCount failedCount pendingCount recipients.status recipients.nextAttemptAt recipients.email recipients.error")
    .lean();
  if (!campaign) return null;

  let waitingForRetry = 0;
  let nextRetryAt = null;
  const failures = [];
  const now = Date.now();
  for (const r of campaign.recipients) {
    if (r.status === "pending" && r.nextAttemptAt && new Date(r.nextAttemptAt).getTime() > now) {
      waitingForRetry += 1;
      if (!nextRetryAt || r.nextAttemptAt < nextRetryAt) nextRetryAt = r.nextAttemptAt;
    }
    if (r.status === "failed" && failures.length < 20) {
      failures.push({ email: r.email, error: r.error });
    }
  }

  return {
    _id: campaign._id,
    status: campaign.status,
    totalRecipients: campaign.totalRecipients,
    sentCount: campaign.sentCount,
    failedCount: campaign.failedCount,
    pendingCount: campaign.pendingCount,
    waitingForRetry,
    nextRetryAt,
    failures,
    done: !["pending", "processing"].includes(campaign.status),
  };
}

/**
 * Send the next chunk of one campaign within a time budget and return progress.
 * Used by the admin browser, which calls it repeatedly until `done` is true.
 * Never sends more than the remaining daily broadcast allowance.
 */
export async function processCampaignChunk(campaignId, { timeBudgetMs = DEFAULT_TIME_BUDGET_MS, maxRecipients = 200 } = {}) {
  await markStaleClaimsFailed(campaignId);

  const quotaBefore = await getBroadcastQuota();
  let processed = 0;
  let providerLimitHit = false;

  if (quotaBefore.remaining > 0) {
    const transporter = createBulkTransporter();
    try {
      ({ processed, providerLimitHit } = await processCampaign(campaignId, {
        maxRecipients: Math.min(maxRecipients, quotaBefore.remaining),
        deadline: Date.now() + timeBudgetMs,
        transporter,
      }));
    } finally {
      transporter.close();
    }
  }

  const progress = await getCampaignProgress(campaignId);
  const quota = processed > 0 ? await getBroadcastQuota() : quotaBefore;
  const pausedForQuota = Boolean(progress && !progress.done && (providerLimitHit || quota.remaining <= 0));

  return { processed, progress, quota, pausedForQuota, providerLimitHit };
}

/**
 * Process bounded work across all unfinished campaigns. Used by the optional
 * cron endpoint as a safety net for campaigns whose browser tab was closed.
 */
export async function processQueuedCampaigns({ maxCampaigns = 3, timeBudgetMs = DEFAULT_TIME_BUDGET_MS } = {}) {
  await markStaleClaimsFailed();
  const quota = await getBroadcastQuota();
  if (quota.remaining <= 0) return { campaigns: 0, processed: 0, pausedForQuota: true };

  const now = new Date();
  const campaigns = await Campaign.find({
    status: { $in: ["pending", "processing"] },
    recipients: {
      $elemMatch: {
        status: "pending",
        $or: [{ nextAttemptAt: null }, { nextAttemptAt: { $lte: now } }],
      },
    },
  })
    .select("_id")
    .sort({ createdAt: 1 })
    .limit(maxCampaigns)
    .lean();

  const deadline = Date.now() + timeBudgetMs;
  const transporter = createBulkTransporter();
  let processed = 0;
  try {
    for (const campaign of campaigns) {
      const allowance = quota.remaining - processed;
      if (Date.now() >= deadline || allowance <= 0) break;
      const result = await processCampaign(campaign._id, { maxRecipients: Math.min(200, allowance), deadline, transporter });
      processed += result.processed;
      if (result.providerLimitHit) break;
    }
  } finally {
    transporter.close();
  }
  return { campaigns: campaigns.length, processed };
}
