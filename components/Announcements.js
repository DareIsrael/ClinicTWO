// components/Announcements.js - News Ticker Style (Right to Left)
"use client";

import { useState, useEffect, useRef } from "react";
import { dashboardService } from "@/services/dashboardService";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getAnnouncements(false);
      if (response.success) {
        // Filter only active announcements
        const activeAnnouncements = (response.announcements || []).filter(
          (announcement) => announcement.isActive === true
        );
        setAnnouncements(activeAnnouncements);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeStyles = (type) => {
    switch (type) {
      case "emergency":
        return "bg-red-600";
      case "warning":
        return "bg-amber-500";
      case "success":
        return "bg-emerald-600";
      case "update":
        return "bg-cyan-600";
      default:
        return "bg-white-800";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "emergency":
        return (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "warning":
        return (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case "success":
        return (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-full"></div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  // Combine all announcements into a single scrolling text
  const scrollingText = announcements
    .map((announcement) => `🔔 ${announcement.title}: ${announcement.content}`)
    .join("   •   ");

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md">
      {/* Colored background bar */}
      <div className={`${getTypeStyles(announcements[0].type)} py-2.5 px-3`}>
        <div className="flex items-center gap-3">
          {/* Static icon on the left */}
          <div className="flex-shrink-0">
            <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
              {getTypeIcon(announcements[0].type)}
            </div>
          </div>

          {/* Scrolling text container */}
          <div className="flex-1 overflow-hidden">
            <div
              ref={scrollRef}
              className="whitespace-nowrap animate-scroll"
              style={{
                animation: "scroll 20s linear infinite",
                display: "inline-block",
              }}
            >
              <span className="text-white text-sm font-medium mx-2">
                {scrollingText}
              </span>
            </div>
          </div>

          {/* Optional: View All link */}
          {/* <button className="flex-shrink-0 text-white/80 hover:text-white text-xs font-medium transition-colors">
            View All
          </button> */}
        </div>
      </div>

      {/* Add the CSS animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Announcements;