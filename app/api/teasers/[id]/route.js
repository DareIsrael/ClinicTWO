import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Teaser from "@/models/Teaser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// PUT: Update a teaser
export async function PUT(request, { params }) {
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

    // Correct way to get params in Next.js App Router
    const { id } = await params;
    const body = await request.json();

    // If publishing this teaser, unpublish all others first
    if (body.isPublished) {
      await Teaser.updateMany({ _id: { $ne: id } }, { isPublished: false });
    }

    const teaser = await Teaser.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true },
    ).populate("createdBy", "firstName lastName email");

    if (!teaser) {
      return NextResponse.json(
        { success: false, message: "Teaser not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Teaser updated successfully",
      teaser,
    });
  } catch (error) {
    console.error("Error updating teaser:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update teaser" },
      { status: 500 },
    );
  }
}

// DELETE: Delete a teaser
export async function DELETE(request, { params }) {
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

    // Correct way to get params in Next.js App Router
    const { id } = await params;

    const teaser = await Teaser.findByIdAndDelete(id);

    if (!teaser) {
      return NextResponse.json(
        { success: false, message: "Teaser not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Teaser deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting teaser:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete teaser" },
      { status: 500 },
    );
  }
}
