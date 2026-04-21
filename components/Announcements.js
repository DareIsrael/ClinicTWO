// components/Announcements.js - Completely Redesigned
"use client";

import { useState, useEffect } from "react";
import { dashboardService } from "@/services/dashboardService";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 1) {
      const interval = setInterval(() => {
        setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [announcements.length]);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getAnnouncements(false);
      if (response.success) {
        setAnnouncements(response.announcements || []);
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
        return "bg-red-50 border-l-4 border-red-500 text-red-800";
      case "warning":
        return "bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800";
      case "success":
        return "bg-green-50 border-l-4 border-green-500 text-green-800";
      case "update":
        return "bg-primary-light border-l-4 border-primary text-gray-900";
      default:
        return "bg-gray-50 border-l-4 border-primary text-gray-900";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "emergency":
        return (
          <svg
            className="w-5 h-5 text-red-400"
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
            className="w-5 h-5 text-yellow-500"
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
            className="w-5 h-5 text-green-500"
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
      case "update":
        return (
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-primary"
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
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 animate-pulse">
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3 mt-1"></div>
          </div>
        </div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return null;
  }

  const announcement = announcements[currentAnnouncement];

  return (
    <div
      className={`${getTypeStyles(announcement.type)} rounded-xl shadow-md transition-all duration-300 ${isExpanded ? "p-4" : "p-3"}`}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getTypeIcon(announcement.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm text-gray-900">
              {announcement.title}
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white shadow-sm text-gray-600 font-medium">
              {announcement.type.toUpperCase()}
            </span>
          </div>

          {/* Message Content */}
          <div
            className={`${isExpanded ? "block" : "line-clamp-2"} text-sm text-gray-600 leading-relaxed`}
          >
            {announcement.content}
          </div>

          {/* Footer with date and controls */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
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
              {new Date(announcement.createdAt).toLocaleDateString()}
            </span>

            <div className="flex items-center space-x-3">
              {/* Pagination dots */}
              {announcements.length > 1 && (
                <div className="flex items-center space-x-1">
                  {announcements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAnnouncement(index)}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        index === currentAnnouncement
                          ? "w-4 bg-primary"
                          : "w-1.5 bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to announcement ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Read More / Show Less button */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary hover:text-primary-dark font-medium transition-colors text-xs"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
