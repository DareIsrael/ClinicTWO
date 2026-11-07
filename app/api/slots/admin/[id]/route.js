import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/utils/db";
import AvailableSlot from "@/models/AvailableSlot";
import Appointment from "@/models/Appointment";

export async function DELETE(request, { params }) {
  try {
    // Only logged-in admins/doctors may delete slots.
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== "admin" && session.user.role !== "doctor")) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 },
      );
    }

    await dbConnect();

    // Next.js 15+ passes params as a Promise.
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Slot ID is required" },
        { status: 400 },
      );
    }

    // Find the slot
    const slot = await AvailableSlot.findById(id);

    if (!slot) {
      return NextResponse.json(
        { success: false, message: "Slot not found" },
        { status: 404 },
      );
    }

    // Check if slot is booked
    if (slot.bookedBy) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete a booked slot. Cancel the appointment first.",
        },
        { status: 400 },
      );
    }

    // Delete the slot
    await AvailableSlot.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Slot deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting slot:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete slot" },
      { status: 500 },
    );
  }
}
