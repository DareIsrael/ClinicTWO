// layout.js - Completely Redesigned with Red Theme
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
        <link rel="icon" href="/TrimLOGO1.svg" />
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

          {/* Modern Footer - Red Theme */}
          <footer className="bg-gray-900 text-white">
            {/* Main Footer Content - Adjusted mobile padding */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
                {/* About Section */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden p-1">
                      <Image
                        src="/TrimLOGO1.svg"
                        alt="Trim Medical Centre Logo"
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Trim Medical Centre
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    Providing compassionate, comprehensive family medicine to
                    the Ottawa community with personalized care from experienced
                    physicians.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
                    Quick Links
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-600 rounded-full"></div>
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/appointment"
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        Book Appointment
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
                    Information
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-600 rounded-full"></div>
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/uninsured-services"
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        Uninsured Services & Fees
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/policies"
                        className="text-gray-400 hover:text-red-400 transition-colors text-sm flex items-center gap-2 group"
                      >
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                        Patient Information & Policies
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
                    Contact Info
                    <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-red-600 rounded-full"></div>
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-gray-400 text-sm">
                      <Phone className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Phone</p>
                        <a
                          href="tel:+13438873470"
                          className="hover:text-red-400 transition-colors break-words"
                        >
                          (343) 224-4070
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-400 text-sm">
                      <span className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0 text-center">
                        📠
                      </span>
                      <div>
                        <p className="font-medium text-white">Fax</p>
                        <p>(888) 615-1221</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-400 text-sm">
                      <Mail className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Email</p>
                        <a
                          href="mailto:contact@trimmedicalcenter.ca"
                          className="hover:text-red-400 transition-colors break-all"
                        >
                          contact@trimmedicalcenter.ca
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-white">Location</p>
                        <p className="break-words">
                          1280 Trim Rd, Unit B, Orleans, ON K4A 3N3
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Hours & Emergency Section */}
              <div className="border-t border-gray-800 pt-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-md font-semibold mb-4 text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-400 flex-shrink-0" />
                      Clinic Hours
                    </h3>
                    <div className="space-y-2 text-gray-400 text-sm">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:max-w-xs gap-1 sm:gap-0">
                        <span>Monday - Thursday:</span>
                        <span className="text-white">10:00 AM - 7:00 PM</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:max-w-xs gap-1 sm:gap-0">
                        <span>Friday:</span>
                        <span className="text-white">10:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:max-w-xs gap-1 sm:gap-0">
                        <span>Saturday:</span>
                        <span className="text-white">10:00 AM - 3:00 PM</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:max-w-xs gap-1 sm:gap-0">
                        <span>Sunday:</span>
                        <span className="text-red-400">Closed</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-semibold mb-4 text-white">
                      Emergency Care
                    </h3>
                    <div className="bg-red-900/20 border border-red-800 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            For medical emergencies, please call{" "}
                            <span className="font-bold text-red-400">911</span>{" "}
                            or visit your nearest hospital emergency department
                            immediately.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="border-t border-gray-800 pt-8 mb-8">
                <div className="max-w-md mx-auto text-center px-4 sm:px-0">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    Stay Updated
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Subscribe to our newsletter for health tips and clinic
                    updates
                  </p>
                  <form className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-sm"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-semibold transition-all duration-200 text-sm text-white"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-800 pt-8 text-center">
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} Trim Medical Centre. All
                  rights reserved.
                </p>
                <p className="text-gray-600 text-xs mt-2">
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
