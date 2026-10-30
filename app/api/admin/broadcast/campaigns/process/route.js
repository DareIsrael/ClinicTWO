import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import { processQueuedCampaigns } from "@/utils/campaignProcessor";

export const runtime = "nodejs";

function authorized(request) {
  const secret = process.env.CRON_SECRET;
  const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!secret || !supplied) return false;

  const expected = Buffer.from(secret);
  const received = Buffer.from(supplied);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

/**
 * OPTIONAL safety net. Normally the admin page delivers campaigns itself via
 * /api/admin/broadcast/campaigns/:id/send. If you also want unfinished
 * campaigns (e.g. browser tab closed) to continue automatically, set
 * CRON_SECRET in your hosting environment and have a scheduler (the GitHub
 * Vercel Cron, a GitHub Action, etc.) call
 * this endpoint with "Authorization: Bearer <CRON_SECRET>". MongoDB claims
 * recipients atomically, so it is safe to run alongside the admin page.
 */
export const maxDuration = 60;

export async function GET(request) {
  return run(request);
}

export async function POST(request) {
  return run(request);
}

async function run(request) {
  if (!authorized(request)) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const result = await processQueuedCampaigns();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Campaign worker error:", error);
    return NextResponse.json({ success: false, message: "Campaign worker failed" }, { status: 500 });
  }
}
