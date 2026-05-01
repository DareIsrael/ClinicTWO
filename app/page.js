// page.js - Completely redesigned with Clean Centered Layout
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Announcements from "@/components/Announcements";

export default function Home() {
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const services = [
    {
      title: "Family Medicine",
      description: "Primary care for all ages from infants to seniors",
    },
    {
      title: "Chronic Care",
      description: "Diabetes, hypertension and heart condition management",
    },
    {
      title: "Preventive Health",
      description: "Regular check-ups, vaccinations and health screenings",
    },
    {
      title: "Sick Notes",
      description: "Same-day school, university and work sick notes",
    },
    {
      title: "STI Screening",
      description: "Confidential and accurate testing",
    },
    {
      title: "WSIB Forms",
      description: "WSIB medical assessments and form 8 completion",
    },
    {
      title: "Driver's Medicals",
      description: "Same-day MTO drivers medical exam",
    },
    {
      title: "Counselling",
      description: "Professional health counselling services",
    },
    { title: "Treatments", description: "Comprehensive medical treatments" },
  ];

  const values = [
    {
      title: "Patient-Centered Care",
      description:
        "Every treatment plan is tailored to your unique health needs and lifestyle",
    },
    {
      title: "Continuity of Care",
      description:
        "Build a long-term relationship with your dedicated family physician",
    },
    {
      title: "Evidence-Based Medicine",
      description:
        "Treatment decisions based on the latest medical research and guidelines",
    },
    {
      title: "Compassionate Approach",
      description:
        "Healthcare delivered with empathy, respect, and understanding",
    },
  ];

  const practiceFeatures = [
    {
      title: "Same-Day Appointments",
      description: "Urgent care needs addressed promptly",
    },
    {
      title: "OHIP Billed Services",
      description: "Most medical services covered by Ontario Health Insurance",
    },
    {
      title: "Comprehensive Care",
      description: "Full-spectrum family medicine for all ages",
    },
    {
      title: "Welcoming Environment",
      description: "Comfortable clinic designed for patient relaxation",
    },
  ];

  const credentials = [
    {
      title: "Medical Degree",
      value: "MD - Doctor of Medicine",
    },
    {
      title: "Canadian Certification",
      value: "CCFP - Canadian College of Family Physicians",
    },
    {
      title: "UK Certification",
      value: "MRCGP - Member of Royal College of General Practitioners",
    },
  ];

  // Auto-rotate services
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [services.length]);

  const nextService = () => {
    setCurrentServiceIndex((prev) => (prev + 1) % services.length);
  };

  const prevService = () => {
    setCurrentServiceIndex(
      (prev) => (prev - 1 + services.length) % services.length,
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Announcements */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pt-3 sm:pt-6">
        <Announcements />
      </div>

      {/* Hero Section with Background Image - reduced padding on mobile */}
      <section
        className="relative bg-cover bg-center bg-no-repeat py-10 sm:py-14 lg:py-20"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dveill0ji/image/upload/v1777532146/Trim3_sc7fb7.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
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

          {/* Title */}
          <h1 className="text-xl sm:text-3xl lg:text-4xl xl:text-4xl font-bold leading-tight tracking-tight mb-3 sm:mb-6">
            Comprehensive Medical Care
            <br />
            <span className="text-white/90 text-base  sm:text-xl lg:text-2xl block mt-1">
              Accessible. Reliable. Patient-focused.
            </span>
          </h1>

          {/* BUTTON ROWS - MOBILE STACKED, DESKTOP ROW */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4 mb-4 sm:mb-6">
            {/* ROSTERED - SMALLEST */}
            <Link
              href=""
              className="inline-flex w-40 sm:w-auto items-center justify-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white text-gray-700 font-semibold text-sm sm:text-base border border-cyan-400 hover:bg-cyan-50 transition-all duration-200"
            >
              Rostered Patients
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2"
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

            {/* WAITLIST - MEDIUM */}
            <Link
              href="/waitlist"
              className="inline-flex w-48 sm:w-auto items-center justify-center px-5 sm:px-8 py-2 sm:py-3 rounded-xl bg-transparent border border-cyan-400 text-white font-semibold text-sm sm:text-base hover:bg-cyan-500/10 transition-all duration-200"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-5.197a6 6 0 00-9 5.197"
                />
              </svg>
              Join Waitlist
            </Link>
          </div>

          {/* SECOND ROW - ALSO RESPONSIVE */}
          <div className="flex justify-center">
            <Link
              href="/book-appointment"
              className="inline-flex w-56 sm:w-auto items-center justify-center px-6 sm:px-10 py-2 sm:py-3 rounded-xl bg-transparent border border-cyan-400 text-white font-semibold text-sm sm:text-base hover:bg-cyan-500/10 transition-all duration-200"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Book Walk-In Care
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section - reduced padding on mobile */}
      {/* Practice Features Section - reduced padding on mobile */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
              Practice Features
            </h2>
            <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Designed with your comfort and convenience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {practiceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-cyan-30 rounded-xl p-5 sm:p-6 text-center transition-all duration-300 border border-gray-100 hover:shadow-md"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 bg-cyan-30-200 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Sliding Carousel */}
      <section className="bg-cyan-30 py-10 sm:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
            Our Services
          </h2>
          <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Comprehensive family medicine services to keep you and your family
            healthy
          </p>

          {/* Sliding Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="transition-transform duration-500 ease-in-out flex"
                style={{
                  transform: `translateX(-${currentServiceIndex * 100}%)`,
                }}
              >
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-2 sm:px-4"
                  >
                    <div className="bg-white rounded-2xl p-6 sm:p-10 text-center shadow-sm border border-gray-100">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-5">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 sm:mb-3">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Smaller on mobile */}
            <button
              onClick={prevService}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 lg:-translate-x-6 w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full shadow-md hover:bg-cyan-30 transition-all flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={nextService}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 lg:translate-x-6 w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 rounded-full shadow-md hover:bg-cyan-30 transition-all flex items-center justify-center"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
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
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-1 sm:space-x-2 mt-6 sm:mt-8">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentServiceIndex(index)}
                  className={`transition-all duration-200 rounded-full ${index === currentServiceIndex ? "w-6 sm:w-8 h-1 bg-cyan-30-700" : "w-1 h-1 sm:w-1.5 sm:h-1.5 bg-cyan-30-300 hover:bg-cyan-30-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Philosophy Section - reduced padding on mobile */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
              Our Practice Philosophy
            </h2>
            <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Guided by principles that put your health and well-being first
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg
                    className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
                  {value.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Physician Section - reduced padding */}
      {/* <section className="bg-cyan-30 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-3 sm:mb-4">
              Meet Our Physician
            </h2>
            <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mx-auto mb-4 sm:mb-6"></div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Experienced, compassionate, and dedicated to your family's health
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 max-w-4xl mx-auto">
            <div className="text-center mb-5 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"  
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-1">
                Dr. Oluwaseun Fagbolagun
              </h3>
              <p className="text-gray-500 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
                Family Physician
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto px-2">
                Dr. Fagbolagun brings over a decade experience of medical
                practice. He is certified in family medicine by both Canadian
                and UK medical boards. With a commitment to excellence and a
                compassionate approach to patient care.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-gray-200">
              {credentials.map((credential, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-30-100 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-700 text-xs sm:text-sm uppercase tracking-wide">
                    {credential.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{credential.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Hours and Quick Contact Section - 2 columns */}
      <section className="bg-cyan-30 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Hours of Operation */}
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6">
                Hours of Operation
              </h2>
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 max-w-md mx-auto lg:mx-0">
                <div className="space-y-2 sm:space-y-3">
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
                      className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium text-gray-700 text-sm sm:text-base">
                        {schedule.day}
                      </span>
                      <span className="text-gray-600 text-xs sm:text-sm">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div className="text-center lg:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 sm:mb-6">
                Quick Contact
              </h2>
              <div className="bg-cyan-30-100 rounded-2xl p-5 sm:p-6 max-w-md mx-auto lg:mx-0">
                <div className="space-y-3 sm:space-y-4">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-30-200 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600"
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
                    </div>
                    <div>
                      {/* <p className="text-xs text-gray-500">Address</p> */}
                      <p className="text-gray-700 font-medium text-sm">
                        1280 Trim Rd, Unit B
                      </p>
                      <p className="text-gray-700 text-sm">
                        Orleans, ON K4A 3N3
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-30-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600"
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
                    </div>
                    <div>
                      {/* <p className="text-xs text-gray-500">Phone</p> */}
                      <a
                        href="tel:3438873470"
                        className="text-gray-700 font-medium hover:text-gray-700 transition-colors text-sm"
                      >
                        (343) 224-4070
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-30-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600"
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
                    </div>
                    <div>
                      {/* <p className="text-xs text-gray-500">Email</p> */}
                      <a
                        href="mailto:contact@trimmedicalcentre.ca"
                        className="text-gray-700 font-medium hover:text-gray-700 transition-colors text-xs break-all"
                      >
                        contact@trimmedicalcentre.ca
                      </a>
                    </div>
                  </div>

                  {/* Fax */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-30-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fax</p>
                      <p className="text-gray-700 font-medium text-sm">
                        (888) 615-1221
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Location Section - Full Width with Bold Styling */}
      <section className="bg-white py-12 sm:py-16">
        <div className="w-full px-0">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-700 mb-3">
              Our Location
            </h2>
            <div className="w-12 h-0.5 bg-cyan-30-400 rounded-full mx-auto"></div>
          </div>

          <div className="w-full">
            <div className="rounded-none overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2796.9693144595276!2d-75.48229282372449!3d45.490562671074414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce13bffd30622b%3A0x25df1a6495298a33!2s1280%20Trim%20Rd%2C%20Orl%C3%A9ans%2C%20ON%20K4A%203P7!5e0!3m2!1sen!2sca!4v1776962002053!5m2!1sen!2sca"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Trim Medical Centre Location"
                className="w-full"
              ></iframe>
            </div>
            <div className="text-center py-4 sm:py-6 bg-cyan-30">
              <p className="text-gray-700 font-medium text-base sm:text-lg mb-2">
                1280 Trim Rd, Unit B, Orleans, ON K4A 3N3
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1280+Trim+Rd+Orl%C3%A9ans+ON+K4A+3P7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cyan-700 hover:text-gray-700 font-semibold text-sm sm:text-base transition-colors border-b border-gray-400 hover:border-gray-700"
              >
                Get Directions
                <svg
                  className="w-4 h-4 ml-1"
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
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Info - reduced padding */}
      <section className="bg-cyan-30 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-cyan-30-100 rounded-xl p-4 sm:p-5 text-center">
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
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
                <h4 className="font-semibold text-red-600 text-xs sm:text-sm">
                  Emergency Care
                </h4>
                <p className="text-gray-600 text-xs">
                  For emergencies, call 911 or visit your nearest hospital
                  emergency department.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
