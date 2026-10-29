import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/utils/db";
import { processCampaignChunk, getCampaignProgress } from "@/utils/campaignProcessor";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Each call only sends for ~15 seconds, but allow headroom for a slow SMTP reply.
export const maxDuration = 60;

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user.role === "admin" || session.user.role === "doctor");
}

/**
 * POST — Send the next chunk of emails for this campaign and return progress.
 * The admin page calls this repeatedly until `progress.done` is true.
 */
export async function POST(request, { params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid campaign id" }, { status: 400 });
  }

  try {
    await dbConnect();
    const { processed, progress } = await processCampaignChunk(id);
    if (!progress) {
      return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, processed, progress });
  } catch (error) {
    console.error("Campaign send error:", error);
    const message = error?.isSmtpConfigError
      ? error.message
      : "An error occurred while sending emails. You can resume from Broadcast History.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

/** GET — Current progress of a campaign (no sending). */
export async function GET(request, { params }) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
  }

  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) {
    return NextResponse.json({ success: false, message: "Invalid campaign id" }, { status: 400 });
  }

  await dbConnect();
  const progress = await getCampaignProgress(id);
  if (!progress) {
    return NextResponse.json({ success: false, message: "Campaign not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, progress });
}

