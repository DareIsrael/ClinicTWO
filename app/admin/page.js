"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import WaitlistTab from "@/components/admin/WaitlistTab";
import ReportsTab from "@/components/admin/ReportsTab";
import AnnouncementsTab from "@/components/admin/AnnouncementsTab";
import AppointmentsTab from "@/components/admin/AppointmentsTab";
import SlotManagement from "@/components/admin/SlotManagement";
import WaitlistBroadcastTab from "@/components/admin/WaitlistBroadcastTab";
import AppointmentBroadcastTab from "@/components/admin/AppointmentBroadcastTab";
import BroadcastHistoryTab from "@/components/admin/BroadcastHistoryTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("waitlist");
  const { user } = useAuth();

  const tabs = [
    {
      id: "waitlist",
      label: "Waitlist",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
    {
      id: "reports",
      label: "Reports",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "slots",
      label: "Slots",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
    },
    {
      id: "waitlist-broadcast",
      label: "Waitlist Broadcast",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "appointment-broadcast",
      label: "Appointment Broadcast",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: "broadcast-history",
      label: "Broadcast History",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-cyan-30">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-700">
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage clinic operations and waitlist
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, {user?.firstName}
                </span>
                <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.firstName?.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content with Vertical Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Vertical Navigation Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              <nav className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
                <div className="p-3 border-b border-gray-200 bg-cyan-30">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Menu
                  </h3>
                </div>
                <div className="py-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-cyan-30 bg-cyan-600 border-l-4 border-cyan-600"
                          : "text-gray-600 hover:bg-cyan-30 hover:text-gray-700"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 ${activeTab === tab.id ? "bg-cyan-600" : "text-gray-400"}`}
                      >
                        {tab.icon}
                      </span>
                      <span className="text-sm font-medium">{tab.label}</span>
                      {activeTab === tab.id && (
                        <svg
                          className="w-4 h-4 ml-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              {activeTab === "waitlist" && <WaitlistTab />}
              {activeTab === "reports" && <ReportsTab />}
              {activeTab === "announcements" && <AnnouncementsTab />}
              {activeTab === "appointments" && <AppointmentsTab />}
              {activeTab === "slots" && <SlotManagement />}
              {activeTab === "waitlist-broadcast" && <WaitlistBroadcastTab />}
              {activeTab === "appointment-broadcast" && (
                <AppointmentBroadcastTab />
              )}
              {activeTab === "broadcast-history" && <BroadcastHistoryTab />}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
