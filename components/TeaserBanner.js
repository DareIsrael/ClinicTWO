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
    let isMounted = true;
    dashboardService
      .getTeasers(false)
      .then((response) => {
        if (isMounted && response.success && response.teasers?.length > 0) {
          setTeaser(response.teasers[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching teaser:", error);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || !teaser || dismissed) {
    return null;
  }

  const hasButton = teaser.buttonText && teaser.buttonText.trim() !== "";
  const isExternalLink =
    teaser.buttonLink &&
    (teaser.buttonLink.startsWith("http://") ||
      teaser.buttonLink.startsWith("https://"));

  return (
    <div className="relative overflow-hidden rounded-xl shadow-md border border-cyan-700 bg-cyan-600 text-white">
      <div className="relative px-5 py-4 sm:px-6 sm:py-4.5 pr-11 sm:pr-14">
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 w-7 h-7 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white/80 hover:text-white"
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left: Icon & Text content aligned */}
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
            <div className="flex-shrink-0 mt-0.5 sm:mt-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/15 rounded-xl flex items-center justify-center border border-white/20">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-white/20 text-white border border-white/30">
                  Announcement
                </span>
                {teaser.headline && (
                  <h3 className="text-white text-base sm:text-lg font-bold tracking-tight">
                    {teaser.headline}
                  </h3>
                )}
              </div>
              <p className="text-cyan-50 text-sm sm:text-base font-medium leading-relaxed">
                {teaser.message}
              </p>
            </div>
          </div>

          {/* Right: CTA Button */}
          {hasButton && (
            <div className="flex-shrink-0 sm:self-center">
              {isExternalLink ? (
                <a
                  href={teaser.buttonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-cyan-800 hover:text-cyan-900 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold shadow-xs hover:shadow hover:bg-cyan-50 transition-all duration-150 whitespace-nowrap"
                >
                  {teaser.buttonText}
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              ) : (
                <Link
                  href={teaser.buttonLink || "#"}
                  className="inline-flex items-center gap-2 bg-white text-cyan-800 hover:text-cyan-900 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-sm sm:text-base font-bold shadow-xs hover:shadow hover:bg-cyan-50 transition-all duration-150 whitespace-nowrap"
                >
                  {teaser.buttonText}
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
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
