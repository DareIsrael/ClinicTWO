// about/page.js - Updated with no box shadows and wider text containers
"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  const credentials = [
    {
      title: "Medical Degree",
      value: "MD - Doctor of Medicine",
      icon: (
        <svg
          className="w-6 h-6"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 14v6l9-5-9-5-9 5 9 5z"
          />
        </svg>
      ),
    },
    {
      title: "Canadian Certification",
      value: "CCFP - Canadian College of Family Physicians",
      icon: (
        <svg
          className="w-6 h-6"
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
    {
      title: "UK Certification",
      value: "MRCGP - Member of Royal College of General Practitioners",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
  ];

  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      title: "Patient-Centered Care",
      description:
        "Every treatment plan is tailored to your unique health needs and lifestyle",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      ),
      title: "Continuity of Care",
      description:
        "Build a long-term relationship with your dedicated family physician",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      title: "Evidence-Based Medicine",
      description:
        "Treatment decisions based on the latest medical research and guidelines",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      title: "Compassionate Approach",
      description:
        "Healthcare delivered with empathy, respect, and understanding",
    },
  ];

  const practiceFeatures = [
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      title: "Same-Day Appointments",
      description: "Urgent care needs addressed promptly",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      ),
      title: "OHIP Billed Services",
      description: "Most medical services covered by Ontario Health Insurance",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      title: "Comprehensive Care",
      description: "Full-spectrum family medicine for all ages",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ),
      title: "Welcoming Environment",
      description: "Comfortable clinic designed for patient relaxation",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-red-50/20 py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-8 lg:px-12">
          <div className="text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-400 text-sm font-medium mb-6 mx-auto lg:mx-0">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About Our Clinic
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Trim Medical Centre
              <br />
              <span className="text-red-400">Family Clinic</span>
            </h1>
            <div className="w-16 h-1 bg-red-400 rounded-full mb-6 mx-auto lg:mx-0"></div>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Providing compassionate, comprehensive family medicine to the
              Ottawa community with personalized care from experienced
              physicians.
            </p>
            <div className="bg-white rounded-xl p-6 border-l-4 border-red-600">
              <p className="text-gray-700 font-medium italic">
                "Building healthier families through dedicated, personalized
                medical care."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Physician Profiles - No Shadows, Wider Text */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Physician
            </h2>
            <div className="w-12 h-1 bg-red-400 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600">
              Experienced, compassionate, and dedicated to your family's health
            </p>
          </div>

          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            <div className="bg-white rounded-2xl border border-gray-100 transition-all duration-300 overflow-hidden">
              <div className="p-2 lg:text-left">
                <div className="mb-6">
                  <div className="w-16 h-1 bg-red-400 rounded-full mb-4 mx-auto lg:mx-0"></div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dr. Oluwaseun Fagbolagun</h3>
                  <p className="text-red-400 font-medium mb-4">Family Physician</p>
                  <p className="text-gray-600 leading-relaxed">
                    Dr. Fagbolagun brings over a decade experience of medical practice. He is certified
                    in family medicine by both Canadian and UK medical boards. With a commitment to excellence
                    and a compassionate approach to patient care, Dr. Fagbolagun provides comprehensive medical
                    services for patients of all ages.
                  </p>
                </div>

                <div className="space-y-4 mt-6 pt-4 border-t border-gray-100">
                  {credentials.map((credential, index) => (
                    <div key={index} className="flex flex-col items-center lg:flex-row lg:items-start space-y-3 lg:space-y-0 lg:space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-400">
                        {credential.icon}
                      </div>
                      <div className="text-center lg:text-left">
                        <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">{credential.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{credential.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </div> */}

          {/* Practice Philosophy Section - No Shadow, Wider */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center lg:text-left">
              Our Practice Philosophy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-3 md:space-y-0 md:space-x-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-400">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {value.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Practice Features - Wider */}
      <section className="py-20 bg-red-50/20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Practice Features
            </h2>
            <div className="w-12 h-1 bg-red-400 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600">
              Designed with your comfort and convenience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practiceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-400 group-hover:scale-105 transition-all duration-300">
                  <div className="text-red-400 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - No Shadows, Wider */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                Our Mission
              </h2>
              <div className="w-12 h-1 bg-red-400 rounded-full mb-6 mx-auto lg:mx-0"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                To serve our patients, team, and community with excellence -
                grounded in integrity, guided by professionalism, and driven by
                patient-centred innovation. We are committed to delivering
                accessible, comprehensive healthcare that evolves with the needs
                of the families we serve.
              </p>
              <div className="bg-white rounded-xl p-6 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3 text-center lg:text-left">
                  Our Commitment
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-center lg:justify-start text-gray-600">
                    <svg
                      className="w-4 h-4 mr-3 text-red-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Personalized care for every patient
                  </li>
                  <li className="flex items-center justify-center lg:justify-start text-gray-600">
                    <svg
                      className="w-4 h-4 mr-3 text-red-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Evidence-based medical practice
                  </li>
                  <li className="flex items-center justify-center lg:justify-start text-gray-600">
                    <svg
                      className="w-4 h-4 mr-3 text-red-400 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Continuity of care through long-term relationships
                  </li>
                </ul>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0">
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                Our Vision
              </h2>
              <div className="w-12 h-1 bg-red-400 rounded-full mb-6 mx-auto lg:mx-0"></div>
              <p className="text-gray-600 leading-relaxed mb-6">
                To provide compassionate, efficient, and high-quality family
                medical care in Ottawa - blending modern technology, premium
                service, and accessible care. We believe every family deserves
                care they can trust - care that grows with them and supports
                their health at every stage of life.
              </p>
              <div className="border-l-4 border-red-600 pl-6">
                <p className="text-lg italic text-gray-700 leading-relaxed">
                  "Building healthier families through dedicated, personalized
                  medical care."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-400 py-16">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to become a patient?
          </h2>
          <p className="text-white/90 mb-8">
            Join our family of satisfied patients and experience compassionate
            care.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-red-400 font-semibold hover:bg-gray-100 transition-all duration-200 shadow-sm"
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
            <Link
              href="/waitlist"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
