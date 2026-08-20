// components/TeaserBanner.js — Public teaser promotional banner
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { dashboardService } from "@/services/dashboardService";

const TeaserBanner = () => {
  const [teaser, setTeaser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    fetchTeaser();
  }, []);

  const fetchTeaser = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getTeasers(false);
      if (response.success && response.teasers && response.teasers.length > 0) {
        setTeaser(response.teasers[0]);
      }
    } catch (error) {
      console.error("Error fetching teaser:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !teaser || dismissed) {
    return null;
  }

  const hasButton = teaser.buttonText && teaser.buttonText.trim() !== "";
  const isExternalLink =
    teaser.buttonLink &&
    (teaser.buttonLink.startsWith("http://") ||
      teaser.buttonLink.startsWith("https://"));

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg border border-cyan-200">
      {/* Gradient background */}
      <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 px-5 py-5 sm:px-8 sm:py-6">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white/70 hover:text-white"
          aria-label="Dismiss teaser"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-11 h-11 bg-white/15 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-lg sm:text-3xl font-bold leading-tight mb-1">
              {teaser.headline}
            </h3>
            <p className="text-cyan-100 text-xl sm:text-2xl font-bold leading-relaxed">
  {teaser.message}
</p>
          </div>

          {/* CTA Button */}
          {hasButton && (
            <div className="flex-shrink-0 sm:ml-4">
              {isExternalLink ? (
                <a
                  href={teaser.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-cyan-700 px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:bg-cyan-50 transition-all duration-200 whitespace-nowrap"
                >
                  {teaser.buttonText}
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              ) : (
                <Link
                  href={teaser.buttonLink || "#"}
                  className="inline-flex items-center gap-2 bg-white text-cyan-700 px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:shadow-lg hover:bg-cyan-50 transition-all duration-200 whitespace-nowrap"
                >
                  {teaser.buttonText}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeaserBanner;
