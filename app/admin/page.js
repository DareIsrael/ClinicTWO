"use client";
import { useState, useEffect } from "react";
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
import TeaserTab from "@/components/admin/TeaserTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("waitlist");
  const [theme, setTheme] = useState("light");
  const { user } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin_theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("admin_theme", nextTheme);
  };


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
      id: "teaser",
      label: "Teaser",
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
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

  const isDark = theme === "dark";

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark-theme-active bg-[#0f172a] text-slate-100" : "bg-cyan-30 text-gray-800"}`}>

        {/* Header */}
        <div className={`shadow transition-colors duration-300 ${isDark ? "bg-[#1e293b] border-b border-slate-800" : "bg-white"}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? "text-slate-100" : "text-gray-700"}`}>
                  Admin Dashboard
                </h1>
                <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-gray-600"}`}>
                  Manage clinic operations and waitlist
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Theme Toggle Button */}
                <button
                  onClick={toggleTheme}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                    isDark
                      ? "bg-slate-800 border-slate-700 text-cyan-400 hover:bg-slate-700"
                      : "bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200"
                  }`}
                  aria-label="Toggle Theme"
                >
                  {isDark ? (
                    <>
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <span>Light Theme</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                      <span>Dark Theme</span>
                    </>
                  )}
                </button>

                <span className={`text-sm hidden sm:block ${isDark ? "text-slate-300" : "text-gray-600"}`}>
                  Welcome, {user?.firstName}
                </span>
                <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
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
              <nav className={`rounded-lg shadow-md overflow-hidden sticky top-6 border transition-colors duration-300 ${
                isDark ? "bg-[#1e293b] border-slate-800" : "bg-white border-gray-200"
              }`}>
                <div className={`p-3 border-b ${isDark ? "border-slate-800 bg-slate-800/60" : "border-gray-200 bg-cyan-30"}`}>
                  <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-slate-300" : "text-gray-700"}`}>
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
                          ? isDark
                            ? "bg-slate-800 text-cyan-400 border-l-4 border-cyan-500 font-semibold"
                            : "bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600 font-semibold"
                          : isDark
                            ? "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                            : "text-gray-600 hover:bg-cyan-50 hover:text-gray-700"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 ${
                          activeTab === tab.id
                            ? "text-cyan-500"
                            : isDark
                              ? "text-slate-400"
                              : "text-gray-400"
                        }`}
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
            <div className={`flex-1 rounded-lg ${isDark ? "dark-theme-active" : ""}`}>
              {activeTab === "waitlist" && <WaitlistTab />}
              {activeTab === "reports" && <ReportsTab />}
              {activeTab === "announcements" && <AnnouncementsTab />}
              {activeTab === "teaser" && <TeaserTab />}
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

