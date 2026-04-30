// layout.js - Completely redesigned with red Theme
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import SessionProvider from "@/components/SessionProvider";
import Image from "next/image";
import {
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

// Import Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Metadata
export const metadata = {
  title: "Trim medical centre - Your Health Partner",
  description: "Book appointments with healthcare professionals easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/TrimLOGO11.svg" />
        {/* IMPORTANT: Viewport meta tag for proper mobile scaling */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes, viewport-fit=cover"
        />
        {/* Prevent layout shifts on mobile */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen bg-white overflow-x-hidden">
            {children}
          </main>

          {/* Modern Footer - red Theme */}
          <footer className="bg-cyan-900 text-white">
            {/* Main Footer Content - Adjusted mobile padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
              {/* Copyright */}
              <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-white text-sm">
                  &copy; {new Date().getFullYear()} Trim Medical Centre. All
                  rights reserved.
                </p>
                <p className="text-white text-xs mt-2">
                  Committed to your health and wellbeing
                </p>
              </div>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
