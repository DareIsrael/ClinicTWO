import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Waitlist from "@/models/Waitlist";
import Appointment from "@/models/Appointment";
import Campaign from "@/models/Campaign";
import { createRateLimiter, getClientIp } from "@/utils/rateLimiter";
import { escapeHtml, isValidEmail } from "@/utils/batchEmailSender";

// 5 campaign creations per 15 minutes per IP
const limiter = createRateLimiter({ windowMs: 15 * 60 * 1000, max: 5 });

/**
 * POST — Create a durable campaign (saved in MongoDB). The admin page then
 * delivers it by calling POST /api/admin/broadcast/campaigns/:id/send repeatedly.
 */
export async function POST(request) {
  try {
    // ── Auth ──
    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "doctor")
    ) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 },
      );
    }

    // ── Rate limit ──
    const ip = getClientIp(request);
    const rateCheck = limiter.check(ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: `Too many requests. Try again in ${rateCheck.retryAfterMinutes} minutes.`,
        },
        { status: 429 },
      );
    }

    await dbConnect();

    const { type, subject, message, statusFilter, targetEmail } =
      await request.json();

    // ── Validate ──
    if (!type || !["waitlist", "appointment"].includes(type)) {
      return NextResponse.json(
        { success: false, message: "Type must be 'waitlist' or 'appointment'" },
        { status: 400 },
      );
    }
    if (!subject || !message) {
      return NextResponse.json(
        { success: false, message: "Subject and message are required" },
        { status: 400 },
      );
    }
    if (subject.length > 200) {
      return NextResponse.json(
        { success: false, message: "Subject must be 200 characters or less" },
        { status: 400 },
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, message: "Message must be 5000 characters or less" },
        { status: 400 },
      );
    }
    if (targetEmail && !isValidEmail(targetEmail.trim())) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format" },
        { status: 400 },
      );
    }

    // ── Resolve recipients ──
    let recipientEmails = [];

    if (targetEmail) {
      const Model = type === "waitlist" ? Waitlist : Appointment;
      const entry = await Model.findOne({
        email: targetEmail.trim().toLowerCase(),
      }).lean();
      if (!entry) {
        return NextResponse.json(
          {
            success: false,
            message: `Email address not found in ${type === "waitlist" ? "the waitlist" : "appointments"}`,
          },
          { status: 404 },
        );
      }
      recipientEmails = [entry.email || targetEmail.trim().toLowerCase()];
    } else {
      const Model = type === "waitlist" ? Waitlist : Appointment;
      const query = {};
      if (statusFilter && statusFilter !== "all") {
        query.status = statusFilter;
      }
      const entries = await Model.find(query).select("email").lean();
      recipientEmails = [
        ...new Set(entries.map((e) => e.email.toLowerCase())),
      ];
    }

    if (recipientEmails.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No recipients found matching your criteria",
        },
        { status: 404 },
      );
    }

    // ── Build email HTML (stored once) ──
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #0284c7; margin-bottom: 5px;">Trim Medical Centre</h1>
        </div>
        <div style="background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px; padding: 24px;">
          <h2 style="color: #1e293b; margin-top: 0;">${safeSubject}</h2>
          <div style="color: #475569; font-size: 15px; line-height: 1.7;">${safeMessage}</div>
        </div>
        <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
          Trim Medical Centre${type === "waitlist" ? " — This email was sent to you because you are on our waitlist." : ""}
        </p>
      </div>
    `;

    // ── Create campaign ──
    const campaign = await Campaign.create({
      type,
      subject,
      message,
      emailHtml,
      statusFilter: statusFilter || "all",
      targetEmail: targetEmail
        ? targetEmail.trim().toLowerCase()
        : undefined,
      sentBy: session.user.email,
      status: "pending",
      totalRecipients: recipientEmails.length,
      pendingCount: recipientEmails.length,
      recipients: recipientEmails.map((email) => ({
        email,
        status: "pending",
      })),
    });

    return NextResponse.json({
      success: true,
      message: `Campaign created for ${recipientEmails.length} recipient(s). Sending now...`,
      campaign: {
        _id: campaign._id,
        status: campaign.status,
        totalRecipients: campaign.totalRecipients,
      },
    });
  } catch (error) {
    console.error("Campaign creation error:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while creating the campaign" },
      { status: 500 },
    );
  }
}

/**
 * GET — List campaigns with pagination.
 */
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (
      !session ||
      (session.user.role !== "admin" && session.user.role !== "doctor")
    ) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 },
      );
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = Math.max(parseInt(searchParams.get("page"), 10) || 1, 1);
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit"), 10) || 15, 1),
      50,
    );
    const type = searchParams.get("type");

    const skip = (page - 1) * limit;
    const query = {};
    if (type && type !== "all") {
      query.type = type;
    }

    const [campaigns, total] = await Promise.all([
      Campaign.find(query)
        .select("-recipients -emailHtml")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Campaign.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      campaigns,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Campaign list error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch campaigns" },
      { status: 500 },
    );
  }
}
