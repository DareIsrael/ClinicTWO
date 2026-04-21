// page.js - Fixed with better Announcements positioning and increased margins
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Announcements from "@/components/Announcements";

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showNewDoctorAnnouncement, setShowNewDoctorAnnouncement] =
    useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      content:
        "Dr. Fagbolagun has been our family physician for over 2 years. The care and attention we receive is exceptional. Same-day appointments have been a lifesaver for our busy family.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Patient",
      content:
        "The clinic is modern, clean, and the staff is very professional. I appreciate how thorough Dr. Fagbolagun is during examinations. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "The Williams Family",
      role: "Family Patients",
      content:
        "From our toddler to grandparents, everyone receives excellent care. The physician takes time to explain everything clearly. Truly a family-focused practice.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-200"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* New Doctor Announcement Modal - Mobile */}
      {showNewDoctorAnnouncement && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowNewDoctorAnnouncement(false)}
          ></div>
          <div className="relative h-full flex items-center justify-center p-6">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">New Physician</h3>
                      <p className="text-xs text-gray-500">
                        Welcome Dr. Okwechime
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewDoctorAnnouncement(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Dr. Babundo Okwechime joins our team starting{" "}
                  <span className="font-semibold">April 27, 2026</span>. Sign up
                  on our waitlist to be rostered with him.
                </p>
                <Link
                  href="/waitlist"
                  className="block w-full text-center bg-red-400 text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                >
                  Join Waitlist
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Announcement Banner */}
      {/* {showNewDoctorAnnouncement && (
        <div className="hidden md:block bg-red-50 border-b border-red-200">
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-900">Welcome Dr. Babundo Okwechime!</span>
                </div>
                <p className="text-sm text-gray-600">Starting April 27, 2026 — accepting new patients on waitlist</p>
                <Link href="/waitlist" className="text-sm font-semibold text-red-400 hover:text-red-700 transition-colors">
                  Join Waitlist →
                </Link>
              </div>
              <button onClick={() => setShowNewDoctorAnnouncement(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )} */}

      {/* Hero Section with Announcements - Fixed Positioning */}
      <section className="relative bg-white pt-8">
        {/* Announcements Component - Positioned without covering content */}
        <div className="relative z-20 max-w-7xl mx-auto px-8 lg:px-12 mb-1">
          <Announcements />
        </div>

        <div className="max-w-6xl mx-auto px-8 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-6">
                <svg
                  className="w-4 h-4 mr-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Accepting New Patients
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
                Family Doctor &<br />
                Walk-In Clinic in
                <br />
                <span className="text-red-400">Downtown Ottawa</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Same-day visits, online booking, and compassionate care for you
                and your family. No phone wait times.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointment"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-400 text-white font-semibold hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Book Appointment
                  <svg
                    className="w-4 h-4 ml-2"
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
                </Link>
                <a
                  href="tel:+13438873470"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call (343) 224-4070
                </a>
              </div>
              <div className="flex items-center space-x-6 mt-8 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Same-day appointments
                  </span>
                </div>
                <div className="flex items-center space-x-2">
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
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">OHIP covered</span>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-500 mb-1">10+</div>
                <div className="text-sm text-gray-500">Years of Service</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-500 mb-1">5k+</div>
                <div className="text-sm text-gray-600">Happy Patients</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-500 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Online Booking</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-gray-500 mb-1">0</div>
                <div className="text-sm text-gray-600">Phone Wait Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Increased margins */}
      <section className="bg-red-50/30 py-20">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Medical Services
            </h2>
            <div className="w-12 h-1 bg-red-400 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600">
              Comprehensive family medicine services to keep you and your family
              healthy
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
                title: "Family Medicine",
                description:
                  "Primary care for all ages from infants to seniors",
              },
              {
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
                title: "Chronic Care",
                description:
                  "Diabetes, hypertension and heart condition management",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Preventive Health",
                description:
                  "Regular check-ups, vaccinations and health screenings",
              },
              {
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                title: "Sick Notes",
                description: "Same-day school, university and work sick notes",
              },
              {
                icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
                title: "STI Screening",
                description: "Confidential and accurate testing",
              },
              {
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                title: "WSIB Forms",
                description: "WSIB medical assessments and form 8 completion",
              },
              {
                icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z",
                title: "Driver's Medicals",
                description: "Same-day MTO drivers medical exam",
              },
              {
                icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                title: "Counselling",
                description: "Professional health counselling services",
              },
              {
                icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z",
                title: "Treatments",
                description: "Comprehensive medical treatments",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-400 group-hover:scale-105 transition-all duration-300">
                  <svg
                    className="w-6 h-6 text-red-400 group-hover:text-white transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={service.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location Section - Increased margins */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Hours of Operation
              </h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="space-y-3">
                  {[
                    { day: "Monday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Tuesday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Wednesday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Thursday", hours: "10:00 AM - 7:00 PM" },
                    { day: "Friday", hours: "10:00 AM - 5:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 3:00 PM" },
                    { day: "Sunday", hours: "Closed" },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
                    >
                      <span className="font-medium text-gray-900">
                        {schedule.day}
                      </span>
                      <span
                        className={
                          schedule.hours === "Closed"
                            ? "text-red-400 font-medium"
                            : "text-gray-600"
                        }
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Visit Us
              </h2>
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="flex items-start space-x-3 mb-4">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-gray-900 font-medium">
                      1280 Trim Rd, Unit B,
                    </p>
                    <p className="text-gray-600">Orleans, ON K4A 3N3</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 mb-6">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <p className="text-gray-900 font-medium">Call Us</p>
                    <a
                      href="tel:3438873470"
                      className="text-red-400 hover:text-red-700 transition-colors"
                    >
                      (343) 224-4070
                    </a>
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-red-400 mt-0.5"
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
                    <div>
                      <h4 className="font-semibold text-red-800 text-sm">
                        Emergency Care
                      </h4>
                      <p className="text-red-700 text-xs mt-0.5">
                        For emergencies, call 911 or visit your nearest hospital
                        emergency department.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Increased margins */}
      <section className="py-20 bg-red-50/30">
        <div className="max-w-4xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Patients Say
            </h2>
            <div className="w-12 h-1 bg-red-400 rounded-full mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <div className="flex justify-center mb-6">
              <div className="flex space-x-1">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
            </div>
            <p className="text-gray-700 text-center text-lg leading-relaxed mb-8">
              "{testimonials[currentTestimonial].content}"
            </p>
            <div className="text-center">
              <p className="font-semibold text-gray-900">
                {testimonials[currentTestimonial].name}
              </p>
              <p className="text-sm text-gray-500">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentTestimonial
                      ? "w-6 bg-red-400"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Policies Section - Increased margins */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Clinic Policies
            </h2>
            <div className="w-12 h-1 bg-red-400 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600">
              Important information to know before your visit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Appointment Policy",
                description:
                  "Please arrive 10 minutes early. Late arrivals may need to reschedule.",
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Cancellation Policy",
                description:
                  "24-hour notice required. Multiple no-shows may result in discharge.",
              },
              {
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
                title: "Document Fees",
                description:
                  "Fees may apply for forms not covered by OHIP. Inquire at reception.",
              },
              {
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                title: "New Patients",
                description:
                  "Bring your health card and any relevant medical records.",
              },
            ].map((policy, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d={policy.icon}
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {policy.title}
                </h3>
                <p className="text-gray-600 text-sm">{policy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-red-400 py-16">
        <div className="max-w-3xl mx-auto px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to book your appointment?
          </h2>
          <p className="text-white/90 mb-8">
            Join thousands of satisfied patients who trust us with their
            family's health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-red-400 font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md"
            >
              Book Appointment
              <svg
                className="w-4 h-4 ml-2"
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
            </Link>
            <a
              href="tel:+13438873470"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Call Now
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
