'use client';

import Link from 'next/link';

// Walk-in booking temporarily disabled while physician coverage is being expanded.
// The AppointmentBooking component is preserved and can be restored by uncommenting below.
// import AppointmentBooking from '@/components/AppointmentBooking';

export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-3 tracking-tight">
            Appointment Booking
          </h1>
        </div>
      </div>

      {/* Appointment Availability Notice */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mt-0.5">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
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

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-cyan-600 text-white font-semibold text-sm hover:bg-cyan-700 transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Join Family Practice Waitlist
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-white text-gray-700 font-semibold text-sm border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}