import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/utils/db";
import AvailableSlot from "@/models/AvailableSlot";
import Appointment from "@/models/Appointment";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
// Largest range that can be loaded at once (keeps responses fast).
const MAX_RANGE_DAYS = 366;

// Only logged-in admins/doctors may view or delete slots.
async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 },
    );
  }
  if (session.user.role !== "admin" && session.user.role !== "doctor") {
    return NextResponse.json(
      { success: false, message: "Admin access required" },
      { status: 403 },
    );
  }
  return null;
}

function isValidDateString(value) {
  if (!DATE_REGEX.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function daysBetween(start, end) {
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

// GET - Get all slots within a date range (past, present or future)
export async function GET(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const order = searchParams.get("order") === "desc" ? -1 : 1;

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: "startDate and endDate are required" },
        { status: 400 },
      );
    }
    if (!isValidDateString(startDate) || !isValidDateString(endDate)) {
      return NextResponse.json(
        { success: false, message: "Dates must be valid and in YYYY-MM-DD format" },
        { status: 400 },
      );
    }
    if (startDate > endDate) {
      return NextResponse.json(
        { success: false, message: "Start date must be before or equal to end date" },
        { status: 400 },
      );
    }
    if (daysBetween(startDate, endDate) > MAX_RANGE_DAYS) {
      return NextResponse.json(
        { success: false, message: `Please choose a range of ${MAX_RANGE_DAYS} days or less` },
        { status: 400 },
      );
    }

    // Dates are stored as YYYY-MM-DD strings, so string comparison is correct.
    const query = { date: { $gte: startDate, $lte: endDate } };

    const slots = await AvailableSlot.find(query)
      .populate("bookedBy", "firstName lastName email status")
      .sort({ date: order, time: 1 })
      .lean();

    // console.log(`Found ${slots.length} slots in database`);

    // SIMPLE: Just return the slots as they are
    return NextResponse.json({
      success: true,
      slots: slots,
      count: slots.length,
    });
  } catch (error) {
    console.error("Error getting slots:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to get slots" },
      { status: 500 },
    );
  }
}

// DELETE - Simple version
export async function DELETE(request) {
  try {
    const authError = await requireAdmin();
    if (authError) return authError;

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const slotId = searchParams.get("slotId");
    const date = searchParams.get("date");

    if (date) {
      // console.log('Deleting slots for date:', date);

      // SIMPLE: Find slots by exact date string
      const slotsToDelete = await AvailableSlot.find({
        date: date,
      });

      // Check if any slots are booked
      const bookedSlots = slotsToDelete.filter((slot) => slot.bookedBy);

      if (bookedSlots.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Cannot delete date with booked appointments. ${bookedSlots.length} slot(s) are currently booked.`,
          },
          { status: 400 },
        );
      }

      // Delete the slots
      const result = await AvailableSlot.deleteMany({
        date: date,
      });

      // console.log(`Deleted ${result.deletedCount} slots for ${date}`);

      return NextResponse.json({
        success: true,
        message: `Deleted all slots for ${date}`,
        deletedCount: result.deletedCount,
      });
    } else if (slotId) {
      // Delete individual slot
      const slot = await AvailableSlot.findById(slotId);

      if (!slot) {
        return NextResponse.json(
          { success: false, message: "Slot not found" },
          { status: 404 },
        );
      }

      if (slot.bookedBy) {
        return NextResponse.json(
          { success: false, message: "Cannot delete a booked slot" },
          { status: 400 },
        );
      }

      await AvailableSlot.findByIdAndDelete(slotId);

      return NextResponse.json({
        success: true,
        message: "Slot deleted successfully",
      });
    }

    // If no parameters provided, bad request
    return NextResponse.json(
      {
        success: false,
        message: "Either slotId or date parameter is required",
      },
      { status: 400 },
    );
  } catch (error) {
    console.error("Error deleting slots:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete slots" },
      { status: 500 },
    );
  }
}
