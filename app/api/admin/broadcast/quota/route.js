import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import { getBroadcastQuota } from "@/utils/campaignProcessor";

export const dynamic = "force-dynamic";

/** GET — Daily broadcast email allowance (sent in last 24h, remaining). */
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "doctor")) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 });
    }

    await dbConnect();
    const quota = await getBroadcastQuota();
    return NextResponse.json({ success: true, quota });
  } catch (error) {
    console.error("Broadcast quota error:", error);
    return NextResponse.json({ success: false, message: "Failed to load email allowance" }, { status: 500 });
  }
}

