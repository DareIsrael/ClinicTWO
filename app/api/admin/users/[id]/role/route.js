import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";

// PATCH - Change a user's role (DOCTOR ONLY)
export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 },
      );
    }

    // ONLY doctors can change roles
    if (session.user.role !== "doctor") {
      return NextResponse.json(
        { success: false, message: "Only doctors can change user roles" },
        { status: 403 },
      );
    }

    await dbConnect();

    const { id } = await params;
    const { role } = await request.json();

    // Validate the target role - only allow patient or admin
    const validRoles = ["patient", "admin"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role. Allowed roles: patient, admin" },
        { status: 400 },
      );
    }

    // Find the target user
    const targetUser = await User.findById(id).select("-password");

    if (!targetUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // Cannot change a doctor's role
    if (targetUser.role === "doctor") {
      return NextResponse.json(
        { success: false, message: "Cannot change the role of a doctor" },
        { status: 403 },
      );
    }

    // Cannot change your own role
    if (targetUser._id.toString() === session.user.id) {
      return NextResponse.json(
        { success: false, message: "Cannot change your own role" },
        { status: 403 },
      );
    }

    // Update the role
    targetUser.role = role;
    await targetUser.save({ validateModifiedOnly: true });

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role} successfully`,
      user: targetUser,
    });
  } catch (error) {
    console.error("Change user role error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user role" },
      { status: 500 },
    );
  }
}
