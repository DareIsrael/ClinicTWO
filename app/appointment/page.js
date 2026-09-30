// book-appointment/page.js - Completely redesigned with Clean UI
"use client";

import Link from "next/link";

export default function BookAppointment() {
  const options = [
    {
      id: 1,
      title: "Rostered Patients",
      description:
        "For patients already registered with our clinic for ongoing care.",
      note: "Existing patients only",
      buttonText: "Book as Existing Patient",
      link: "",
      icon: (
        <svg
          className="w-7 h-7"
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
      ),
    },
    /* Walk-In Care option temporarily hidden while physician coverage is being expanded
    {
      id: 2,
      title: "Walk-In Care",
      description:
        "For new or unregistered patients who need to be seen today.",
      note: "Urgent or one time visits",
      buttonText: "Book Walk-In Appointment",
      link: "/book-appointment",
      icon: (
        <svg
          className="w-7 h-7"
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
      ),
    },
    */
    {
      id: 3,
      title: "Join Family Practice Waitlist",
      description:
        "Register your interest for long-term family physician care.",
      note: "Waitlist currently open",
      buttonText: "Join Waitlist",
      link: "/waitlist",
      icon: (
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Online Booking
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-3 tracking-tight">
            Book an Appointment
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            Select the option that best fits your needs.
          </p>
        </div>
      </div>

      {/* Appointment Availability Notice */}
      <div className="bg-amber-50 border-b border-amber-200 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                Appointment Availability Update
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                We are currently adjusting our appointment availability as we work to expand physician coverage at Trim Medical Centre.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                Walk-in appointments are not currently available.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3">
                Our family practice waitlist remains open, and patients already registered on the waitlist do not need to register again. We will contact patients as appointments become available.
              </p>
              <p className="text-sm sm:text-base text-gray-600 italic">
                Thank you for your patience and continued trust in Trim Medical Centre.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Booking Options */}
      <main className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {options.map((option) => (
              <div
                key={option.id}
                className="group bg-white border border-gray-100 rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:border-gray-200"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-cyan-600 group-hover:scale-105 transition-all duration-300">
                  <div className="text-gray-600 group-hover:text-white transition-colors">
                    {option.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 mb-3 text-sm leading-relaxed">
                  {option.description}
                </p>

                {/* Note */}
                <div className="inline-block bg-gray-100 rounded-full px-3 py-1 mb-5">
                  <p className="text-xs text-gray-500">{option.note}</p>
                </div>

                {/* Button */}
                <Link
                  href={option.link}
                  className="block text-center py-2.5 px-5 rounded-lg font-medium text-sm bg-cyan-600 text-white hover:bg-cyan-500 transition-all duration-200 shadow-sm"
                >
                  {option.buttonText}
                  <svg
                    className="w-3.5 h-3.5 inline-block ml-1 group-hover:translate-x-0.5 transition-transform"
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
              </div>
            ))}
          </div>

          {/* Help Section */}
          <div className="mt-12 text-center">
            <div className="bg-gray-50 rounded-xl p-6 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-4 h-4 mr-1.5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">
                    Need help or have questions?
                  </span>
                </div>

                <a
                  href="tel:+13432244070"
                  className="inline-flex items-center justify-center text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 rounded-full px-5 py-2"
                >
                  <svg
                    className="w-3.5 h-3.5 mr-1.5"
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
                  Call (705) 242-5090
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Our administrative team is available to assist with existing patient matters and general enquiries
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light mb-3">
            Have Questions About Your Care?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Our administrative team is here to help with existing patient matters and general enquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+13432244070"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200 text-sm border border-gray-200"
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
              Call (705) 242-5090
            </a>
            <Link
              href="/contact"
              className="bg-cyan-600 inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-white font-medium hover:bg-cyan-700 transition-all duration-200 text-sm"
            >
              Contact Us
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
