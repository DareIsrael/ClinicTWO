// book-appointment/page.js - Completely Redesigned
"use client";

import Link from "next/link";

export default function BookAppointment() {
  const options = [
    {
      id: 1,
      title: "Rostered Patients",
      description:
        "For patients already registered with Dr. Fagbolagun for ongoing care.",
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
      <section className="relative bg-red-50/20 py-20 lg:py-18">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-400 text-sm font-medium mb-2">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Online Booking
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Book an
              <br />
              <span className="text-red-400">Appointment</span>
            </h1>
            <div className="w-16 h-1 bg-red-400 rounded-full mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Select the option that best fits your needs. Same-day appointments
              available for urgent care.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Booking Options */}
      <main className="py-1 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {options.map((option) => (
              <div
                key={option.id}
                className="group bg-white border border-gray-100 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:border-gray-200"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-400 group-hover:scale-105 transition-all duration-300">
                  <div className="text-red-400 group-hover:text-white transition-colors">
                    {option.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {option.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-3 text-base leading-relaxed">
                  {option.description}
                </p>

                {/* Note */}
                <div className="inline-block bg-gray-50 rounded-full px-3 py-1 mb-6">
                  <p className="text-xs text-gray-500">{option.note}</p>
                </div>

                {/* Button */}
                <Link
                  href={option.link}
                  className="block text-center py-3 px-6 rounded-xl font-semibold text-base bg-red-400 text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  {option.buttonText}
                  <svg
                    className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform"
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
          <div className="mt-16 text-center">
            <div className="bg-gray-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center text-gray-600">
                  <svg
                    className="w-5 h-5 mr-2 text-red-400"
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
                  <span className="text-sm">Need help choosing?</span>
                </div>

                <a
                  href="tel:+13432244070"
                  className="inline-flex items-center justify-center text-sm font-semibold text-red-400 bg-red-50 hover:bg-red-400 hover:text-white transition-all duration-200 rounded-full px-6 py-2.5"
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
              <p className="text-xs text-gray-500 mt-4">
                Our staff is available to help you choose the right appointment
                type
              </p>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-red-400"
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
              <h4 className="font-semibold text-gray-900 mb-1">
                Same-Day Appointments
              </h4>
              <p className="text-xs text-gray-500">
                Available for urgent care needs
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-red-400"
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
              <h4 className="font-semibold text-gray-900 mb-1">OHIP Covered</h4>
              <p className="text-xs text-gray-500">
                Most services are covered by OHIP
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-red-400"
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
              <h4 className="font-semibold text-gray-900 mb-1">
                Central Location
              </h4>
              <p className="text-xs text-gray-500">
                1280 Trim Rd, Unit B, Orleans, ON K4A 3N3
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-red-400 py-16">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need Immediate Medical Attention?
          </h2>
          <p className="text-white/90 mb-8">
            For urgent medical concerns, please call us or visit our clinic
            directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13438873470"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-red-400 font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md"
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
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200"
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
