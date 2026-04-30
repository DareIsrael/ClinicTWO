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
      link: "https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554",
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
    {
      id: 2,
      title: "Walk-In Care",
      description:
        "For new or unregistered patients who need to be seen today.",
      note: "Urgent or one-time visits",
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
    {
      id: 3,
      title: "Register as New Patient",
      description:
        "Join the list to become a permanent patient for long-term care.",
      note: "Not for same-day visits",
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
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
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
            Select the option that best fits your needs. Same-day appointments
            available for urgent care.
          </p>
        </div>
      </div>

      {/* Main Content - Booking Options */}
      <main className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    Need help choosing?
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
                  Call (343) 224-4070
                </a>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Our staff is available to help you choose the right appointment
                type
              </p>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="text-center p-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-5 h-5 text-gray-500"
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
              <h4 className="font-medium text-gray-800 text-sm mb-0.5">
                Same-Day Appointments
              </h4>
              <p className="text-xs text-gray-500">
                Available for urgent care needs
              </p>
            </div>
            <div className="text-center p-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800 text-sm mb-0.5">
                OHIP Covered
              </h4>
              <p className="text-xs text-gray-500">
                Most services are covered by OHIP
              </p>
            </div>
            <div className="text-center p-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800 text-sm mb-0.5">
                Central Location
              </h4>
              <p className="text-xs text-gray-500">
                1280 Trim Rd, Unit B, Orleans
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light  mb-3">
            Need Immediate Medical Attention?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            For urgent medical concerns, please call us or visit our clinic
            directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+13438873470"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200 text-sm"
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
            <Link
              href="/contact"
              className="bg-cyan-600 inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-gray-600 text-white font-medium hover:bg-gray-800 transition-all duration-200 text-sm"
            >
              View Location
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
