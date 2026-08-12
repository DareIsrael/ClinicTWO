import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Teaser from "@/models/Teaser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Helper to safely get user ID from session
const getUserIdFromSession = (session) => {
  return session?.user?.id || session?.user?._id || session?.user?.userId;
};

// GET: Fetch teasers
export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get("admin") === "true";

    let query = {};

    if (!isAdmin) {
      // For public view: only the published teaser
      query = { isPublished: true };
    }

    const teasers = await Teaser.find(query)
      .sort({ createdAt: -1 })
      .populate("createdBy", "firstName lastName email")
      .lean();

    return NextResponse.json({
      success: true,
      teasers,
    });
  } catch (error) {
    console.error("Error fetching teasers:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch teasers" },
      { status: 500 },
    );
  }
}

// POST: Create a new teaser
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    // Check authentication
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    // Check admin role
    if (session.user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 },
      );
    }

    await dbConnect();

    const body = await request.json();
    const { headline, message, buttonText, buttonLink, isPublished } = body;

    // Validation
    if (!headline || !message) {
      return NextResponse.json(
        { success: false, message: "Headline and message are required" },
        { status: 400 },
      );
    }

    // Get user ID from session
    const userId = getUserIdFromSession(session);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unable to determine user ID from session" },
        { status: 400 },
      );
    }

    // If publishing this teaser, unpublish all others first
    if (isPublished) {
      await Teaser.updateMany({}, { isPublished: false });
    }

    const teaser = await Teaser.create({
      headline,
      message,
      buttonText: buttonText || "",
      buttonLink: buttonLink || "",
      isPublished: isPublished || false,
      createdBy: userId,
    });

    return NextResponse.json({
      success: true,
      message: "Teaser created successfully",
      teaser,
    });
  } catch (error) {
    console.error("Error creating teaser:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create teaser" },
      { status: 500 },
    );
  }
}
