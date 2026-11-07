"use client";
import { useState, useEffect } from "react";

export default function SlotManagement() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [times, setTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [viewDate, setViewDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [viewLoading, setViewLoading] = useState(false);
  const [allSlots, setAllSlots] = useState([]);
  const [allSlotsLoading, setAllSlotsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  // "upcoming" | "past" | "custom"
  const [viewMode, setViewMode] = useState("upcoming");
  const [pastDays, setPastDays] = useState(30);
  // The range currently shown in the list (used to refresh after changes)
  const [loadedRange, setLoadedRange] = useState(null);

  // Common time slots
  const commonTimes = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
];

  // SIMPLE: Get today's date as YYYY-MM-DD
  const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // SIMPLE: Get future date as YYYY-MM-DD
  const getFuturedate = (daysToAdd) => {
    const future = new Date();
    future.setDate(future.getDate() + daysToAdd);
    const year = future.getFullYear();
    const month = String(future.getMonth() + 1).padStart(2, "0");
    const day = String(future.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // SIMPLE: Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";

    if (
      typeof dateString === "string" &&
      dateString.match(/^\d{4}-\d{2}-\d{2}$/)
    ) {
      const [year, month, day] = dateString.split("-");
      const dateObj = new Date(year, month - 1, day);

      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      return dateObj.toLocaleDateString("en-US", options);
    }

    return dateString;
  };

  // Today's date for min attribute
  const todayDate = getTodayDate();

  // A date (YYYY-MM-DD) before today is in the past. Past slots are read-only.
  const isPastDate = (dateString) => dateString < todayDate;

  // booked = a patient holds it; unavailable = manually blocked by admin
  const getSlotStatus = (slot) => {
    if (slot.bookedBy) return "booked";
    return slot.isAvailable ? "available" : "unavailable";
  };

  const loadSlots = async ({ start, end, order = "asc" }, successText = "") => {
    try {
      setAllSlotsLoading(true);

      const response = await fetch(
        `/api/slots/admin?startDate=${start}&endDate=${end}&order=${order}`,
      );
      const data = await response.json();

      if (data.success) {
        setAllSlots(data.slots || []);
        setLoadedRange({ start, end, order });
        if (successText) {
          setMessage({ type: "success", text: successText });
        }
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to load slots",
        });
      }
    } catch (error) {
      console.error("Error loading slots:", error);
      setMessage({ type: "error", text: "Failed to load slots" });
    } finally {
      setAllSlotsLoading(false);
    }
  };

  // Upcoming: today + next 30 days
  const fetchAllSlots = async () => {
    const range = { start: getTodayDate(), end: getFuturedate(30), order: "asc" };
    setViewMode("upcoming");
    setDateRange({ start: range.start, end: range.end });
    await loadSlots(range);
  };

  // Past: the last N days up to yesterday, newest first
  const fetchPastSlots = async (days = pastDays) => {
    const range = { start: getFuturedate(-days), end: getFuturedate(-1), order: "desc" };
    setViewMode("past");
    setPastDays(days);
    setDateRange({ start: range.start, end: range.end });
    await loadSlots(range);
  };

  const fetchSlotsByDateRange = async () => {
    if (!dateRange.start || !dateRange.end) {
      setMessage({
        type: "error",
        text: "Please select both start and end dates",
      });
      return;
    }
    if (dateRange.start > dateRange.end) {
      setMessage({
        type: "error",
        text: "Start date must be before or equal to end date",
      });
      return;
    }

    setViewMode("custom");
    const order = dateRange.end < todayDate ? "desc" : "asc";
    const range = { start: dateRange.start, end: dateRange.end, order };
    // Load first, then show how many were found.
    try {
      setAllSlotsLoading(true);
      const response = await fetch(
        `/api/slots/admin?startDate=${range.start}&endDate=${range.end}&order=${range.order}`,
      );
      const data = await response.json();
      if (data.success) {
        setAllSlots(data.slots || []);
        setLoadedRange(range);
        setMessage({
          type: "success",
          text: `Loaded ${data.slots?.length || 0} slots`,
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to load slots",
        });
      }
    } catch (error) {
      console.error("Error loading slots:", error);
      setMessage({ type: "error", text: "Failed to load slots" });
    } finally {
      setAllSlotsLoading(false);
    }
  };

  // Reload whatever range is currently displayed
  const refreshCurrentView = async () => {
    if (viewMode === "past") return fetchPastSlots(pastDays);
    if (viewMode === "custom" && loadedRange) return loadSlots(loadedRange);
    return fetchAllSlots();
  };

  // Load upcoming slots on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAllSlots();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTime = () => {
    if (time && !times.includes(time)) {
      setTimes([...times, time]);
      setTime("");
    }
  };

  const removeTime = (timeToRemove) => {
    setTimes(times.filter((t) => t !== timeToRemove));
  };

  const addCommonTime = (commonTime) => {
    if (!times.includes(commonTime)) {
      setTimes([...times, commonTime]);
    }
  };

  const clearAllTimes = () => {
    setTimes([]);
  };

  const submitSlots = async () => {
    if (!date || times.length === 0) {
      setMessage({
        type: "error",
        text: "Please select a date and add at least one time slot",
      });
      return;
    }

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("/api/appointments/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
          times,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          type: "success",
          text: `Successfully added ${data.count} slot(s) for ${formatDisplayDate(date)}`,
        });
        setTimes([]);
        setDate("");
        await fetchAllSlots();
      } else {
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error adding slots:", error);
      setMessage({ type: "error", text: "Failed to add slots" });
    } finally {
      setLoading(false);
    }
  };

  const viewSlots = async () => {
    if (!viewDate) {
      setMessage({ type: "error", text: "Please select a date to view slots" });
      return;
    }

    setViewLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch(`/api/appointments?date=${viewDate}`);
      const data = await response.json();

      if (data.success) {
        setAvailableSlots(data.slots || []);
      } else {
        setAvailableSlots([]);
        setMessage({ type: "error", text: data.message });
      }
    } catch (error) {
      console.error("Error loading slots:", error);
      setAvailableSlots([]);
      setMessage({ type: "error", text: "Failed to load slots" });
    } finally {
      setViewLoading(false);
    }
  };

  const toggleSlotAvailability = async (slotId, currentAvailability) => {
    const target = allSlots.find((slot) => slot._id === slotId);
    if (target?.bookedBy && !currentAvailability) {
      const name = [target.bookedBy.firstName, target.bookedBy.lastName].filter(Boolean).join(" ") || "a patient";
      if (
        !confirm(
          `This slot is booked by ${name}. Making it available will allow someone else to book the same time. Continue?`,
        )
      ) {
        return;
      }
    }

    try {
      const response = await fetch("/api/appointments/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slotId,
          isAvailable: !currentAvailability,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setAvailableSlots((prev) =>
          prev.map((slot) =>
            slot._id === slotId
              ? { ...slot, isAvailable: !currentAvailability }
              : slot,
          ),
        );
        setAllSlots((prev) =>
          prev.map((slot) =>
            slot._id === slotId
              ? {
                  ...slot,
                  isAvailable: !currentAvailability,
                  // The server clears the booking when a slot is made available
                  bookedBy: !currentAvailability ? null : slot.bookedBy,
                }
              : slot,
          ),
        );
        setMessage({ type: "success", text: "Slot availability updated" });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to update slot",
        });
      }
    } catch (error) {
      console.error("Error toggling slot:", error);
      setMessage({ type: "error", text: "Failed to update slot" });
    }
  };

  const deleteSlot = async (slotId) => {
    if (
      !confirm(
        "Are you sure you want to delete this slot? This cannot be undone.",
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/slots/admin?slotId=${slotId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setAllSlots((prev) => prev.filter((slot) => slot._id !== slotId));
        setAvailableSlots((prev) => prev.filter((slot) => slot._id !== slotId));
        setMessage({ type: "success", text: "Slot deleted successfully" });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to delete slot",
        });
      }
    } catch (error) {
      console.error("Error deleting slot:", error);
      setMessage({ type: "error", text: "Failed to delete slot" });
    }
  };

  const deleteAllSlotsForDate = async (date) => {
    if (
      !confirm(
        `Are you sure you want to delete ALL slots for ${formatDisplayDate(date)}? This cannot be undone.`,
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/slots/admin?date=${date}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setAllSlots((prev) =>
          prev.filter((slot) => {
            const slotDate = slot.canadaDate || slot.date;
            return slotDate !== date;
          }),
        );
        setMessage({
          type: "success",
          text: `Deleted all slots for ${formatDisplayDate(date)}`,
        });
      } else {
        setMessage({
          type: "error",
          text: data.message || "Failed to delete slots",
        });
      }
    } catch (error) {
      console.error("Error deleting slots:", error);
      setMessage({ type: "error", text: "Failed to delete slots" });
    }
  };

  // Group slots by date
  const groupedSlots = allSlots.reduce((groups, slot) => {
    const dateKey = slot.canadaDate || slot.date;
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(slot);
    return groups;
  }, {});

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-6">
        Manage Available Slots
      </h2>

      <div className="mb-4 p-3 bg-cyan-30 rounded-lg border border-cyan-100">
        <p className="text-xs  mt-1">
          Today is: {formatDisplayDate(todayDate)} ({todayDate})
        </p>
      </div>

      {/* Message Display */}
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-cyan-30 text-red-800"}`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add New Slots */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Add New Slots
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={todayDate}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-cyan-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Selected date: {date ? formatDisplayDate(date) : "Not selected"}{" "}
                ({date})
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Time Slot *
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-cyan-500"
                />
                <button
                  onClick={addTime}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                >
                  Add
                </button>
              </div>

              {/* Common Times */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Quick Add Common Times:
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonTimes.map((commonTime) => (
                    <button
                      key={commonTime}
                      onClick={() => addCommonTime(commonTime)}
                      className="px-3 py-1 text-sm bg-cyan-30-100 text-gray-700 rounded hover:bg-cyan-30-200"
                    >
                      {commonTime}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Times */}
            {times.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Selected Times ({times.length})
                  </span>
                  <button
                    onClick={clearAllTimes}
                    className="text-sm bg-cyan-600 hover:text-red-800"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 p-3 bg-cyan-30 rounded-lg border border-gray-200">
                  {[...times].sort().map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 px-3 py-1 bg-white rounded border border-gray-300"
                    >
                      <span className="text-gray-700">{t}</span>
                      <button
                        onClick={() => removeTime(t)}
                        className="bg-cyan-600 hover:bg-cyan-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={submitSlots}
              disabled={loading || !date || times.length === 0}
              className="w-full px-4 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading
                ? "Adding Slots..."
                : `Add ${times.length} Slot${times.length !== 1 ? "s" : ""} `}
            </button>
          </div>
        </div>
      </div>

      {/* All Created Slots Dashboard */}
      <div className="mt-8">
        <div className="flex flex-col gap-4 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700">
              All Created Slots
            </h3>
            <p className="text-sm text-gray-600">
              View upcoming slots, look back at past slots, or pick any date range
            </p>
          </div>

          {/* View switcher */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={fetchAllSlots}
              disabled={allSlotsLoading}
              className={`px-4 py-2 rounded text-sm font-medium border disabled:opacity-50 ${viewMode === "upcoming" ? "bg-cyan-600 text-white border-cyan-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
            >
              Upcoming (next 30 days)
            </button>
            <button
              onClick={() => fetchPastSlots(pastDays)}
              disabled={allSlotsLoading}
              className={`px-4 py-2 rounded text-sm font-medium border disabled:opacity-50 ${viewMode === "past" ? "bg-cyan-600 text-white border-cyan-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
            >
              Past Slots
            </button>
            <button
              onClick={() => setViewMode("custom")}
              disabled={allSlotsLoading}
              className={`px-4 py-2 rounded text-sm font-medium border disabled:opacity-50 ${viewMode === "custom" ? "bg-cyan-600 text-white border-cyan-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
            >
              Custom Range
            </button>
            <button
              onClick={refreshCurrentView}
              disabled={allSlotsLoading}
              className="px-4 py-2 rounded text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              {allSlotsLoading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {/* Past presets */}
          {viewMode === "past" && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-600">Show the last:</span>
              {[7, 30, 90, 365].map((days) => (
                <button
                  key={days}
                  onClick={() => fetchPastSlots(days)}
                  disabled={allSlotsLoading}
                  className={`px-3 py-1 rounded text-sm border disabled:opacity-50 ${pastDays === days ? "bg-cyan-100 text-cyan-800 border-cyan-300" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"}`}
                >
                  {days === 365 ? "1 year" : `${days} days`}
                </button>
              ))}
            </div>
          )}

          {/* Custom range (any dates, including the past) */}
          {viewMode === "custom" && (
            <div className="flex flex-col sm:flex-row sm:items-end gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">From</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm focus:ring-red-500 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">To</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                  min={dateRange.start || undefined}
                  className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-sm focus:ring-red-500 focus:border-cyan-500"
                />
              </div>
              <button
                onClick={fetchSlotsByDateRange}
                disabled={allSlotsLoading || !dateRange.start || !dateRange.end}
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50 text-sm"
              >
                {allSlotsLoading ? "Loading..." : "Show Slots"}
              </button>
              <span className="text-xs text-gray-500 sm:pb-2">Up to 1 year at a time</span>
            </div>
          )}

          {loadedRange && !allSlotsLoading && (
            <p className="text-xs text-gray-500">
              Showing {formatDisplayDate(loadedRange.start)} – {formatDisplayDate(loadedRange.end)}
            </p>
          )}
        </div>

        {allSlotsLoading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
            <p className="mt-2 text-gray-600">Loading slots...</p>
          </div>
        ) : Object.keys(groupedSlots).length > 0 ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-cyan-30 px-4 py-3 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-sm font-medium text-gray-700">
                  {Object.keys(groupedSlots).length} date(s) • {allSlots.length}{" "}
                  total slots
                </span>
                <span className="text-sm text-gray-600">
                  {allSlots.filter((slot) => getSlotStatus(slot) === "booked").length} booked
                  {" • "}
                  {allSlots.filter((slot) => getSlotStatus(slot) === "available").length}{" "}
                  {viewMode === "past" ? "not booked" : "available"}
                  {" • "}
                  {allSlots.filter((slot) => getSlotStatus(slot) === "unavailable").length} unavailable
                </span>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {Object.entries(groupedSlots)
                .sort(([dateA], [dateB]) =>
                  loadedRange?.order === "desc"
                    ? dateB.localeCompare(dateA)
                    : dateA.localeCompare(dateB),
                )
                .map(([date, slots]) => {
                  const past = isPastDate(date);
                  const bookedCount = slots.filter((s) => getSlotStatus(s) === "booked").length;
                  const openCount = slots.filter((s) => getSlotStatus(s) === "available").length;
                  const blockedCount = slots.filter((s) => getSlotStatus(s) === "unavailable").length;
                  return (
                    <div
                      key={date}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <div className={`px-4 py-3 border-b border-gray-100 ${past ? "bg-gray-50" : "bg-cyan-30"}`}>
                        <div className="flex justify-between items-center gap-3">
                          <div>
                            <span className="font-medium text-gray-700">
                              {formatDisplayDate(date)}
                            </span>
                            {date === todayDate && (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-cyan-100 text-cyan-800">
                                Today
                              </span>
                            )}
                            {past && (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                                Past
                              </span>
                            )}
                            <span className="ml-3 text-sm text-gray-600">
                              {slots.length} slot{slots.length !== 1 ? "s" : ""} •
                              <span className="ml-1">
                                {bookedCount} booked, {openCount}{" "}
                                {past ? "not booked" : "available"}
                                {blockedCount > 0 ? `, ${blockedCount} unavailable` : ""}
                              </span>
                            </span>
                          </div>
                          {!past && (
                            <button
                              onClick={() => deleteAllSlotsForDate(date)}
                              className="text-sm  hover:text-red-800"
                            >
                              Delete All
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {[...slots]
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map((slot) => {
                              const status = getSlotStatus(slot);
                              const patientName = slot.bookedBy
                                ? [slot.bookedBy.firstName, slot.bookedBy.lastName].filter(Boolean).join(" ")
                                : "";
                              const label =
                                status === "booked"
                                  ? "Booked"
                                  : status === "available"
                                    ? past ? "Not booked" : "Available"
                                    : "Unavailable";
                              const badge =
                                status === "booked"
                                  ? "bg-cyan-100 text-red-800"
                                  : status === "available"
                                    ? past ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800";
                              return (
                                <div
                                  key={slot._id}
                                  className={`flex items-center gap-2 px-3 py-2 rounded border ${past ? "bg-gray-50 border-gray-200" : "bg-white border-gray-300 hover:border-gray-400"}`}
                                >
                                  <span className="font-medium text-gray-700">
                                    {slot.time}
                                  </span>
                                  <span className={`px-2 py-1 text-xs rounded-full ${badge}`}>
                                    {label}
                                  </span>
                                  {slot.bookedBy && (
                                    <span
                                      className="text-xs text-gray-500"
                                      title={slot.bookedBy.email || ""}
                                    >
                                      ({patientName || "Booked"}
                                      {slot.bookedBy.status ? ` • ${slot.bookedBy.status.replace("_", " ")}` : ""})
                                    </span>
                                  )}
                                  {!past && (
                                    <div className="flex gap-1">
                                      <button
                                        onClick={() =>
                                          toggleSlotAvailability(
                                            slot._id,
                                            slot.isAvailable,
                                          )
                                        }
                                        className={`px-2 py-1 text-xs rounded ${slot.isAvailable ? "bg-cyan-30 bg-cyan-600 hover:bg-cyan-100" : "bg-green-50 text-green-700 hover:bg-green-100"}`}
                                      >
                                        {slot.isAvailable
                                          ? "Make Unavailable"
                                          : "Make Available"}
                                      </button>
                                      <button
                                        onClick={() => deleteSlot(slot._id)}
                                        className="px-2 py-1 text-xs bg-cyan-30 bg-cyan-600 rounded hover:bg-cyan-100"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 border border-gray-200 rounded-lg">
            {viewMode === "past"
              ? `No slots found in the last ${pastDays === 365 ? "year" : `${pastDays} days`}.`
              : viewMode === "custom"
                ? "No slots found for this date range."
                : "No upcoming slots. Add slots using the form above."}
          </div>
        )}
      </div>

      {/* Information Panel */}
      <div className="mt-8 p-4 bg-cyan-30 rounded-lg border border-cyan-100">
        <h4 className="font-medium text-cyan-900 mb-2">How it works:</h4>
        <ul className="text-sm space-y-1">
          <li>• Add available time slots for specific dates</li>
          <li>• Patients can only book from available slots</li>
          <li>• Once a slot is booked, it becomes unavailable to others</li>
          <li>• You can manually mark slots as available/unavailable</li>
          <li>• Delete individual slots or all slots for a specific date</li>
          <li>• View all created slots in the dashboard above</li>
          <li>• Use &quot;Past Slots&quot; or &quot;Custom Range&quot; to look back at previous dates (read-only)</li>
        </ul>
      </div>
    </div>
  );
}
