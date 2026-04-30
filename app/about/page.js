// about/page.js - Completely redesigned with Clean UI
"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Minimal */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-30-100 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-cyan-30-600 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              About Our Clinic
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-3 tracking-tight">
            Trim Medical Centre
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            Providing compassionate, comprehensive family medicine to the
            Orleans community with personalized care from experienced
            physicians.
          </p>
        </div>
      </div>

      {/* Meet Our Physician Section */}
      <section className="bg-cyan-30 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-700 mb-3">
              Meet Our Physician
            </h2>
            <div className="w-12 h-0.5 bg-cyan-30-300 rounded-full mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-cyan-500"
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
              <h3 className="text-2xl font-medium text-gray-700 mb-1">
                Dr. Oluwaseun Fagbolagun
              </h3>
              <p className="text-gray-500 text-sm mb-4">Family Physician</p>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
                Dr. Fagbolagun brings over a decade of medical practice
                experience. He is certified in family medicine by both Canadian
                and UK medical boards. With a commitment to excellence and a
                compassionate approach to patient care, he provides
                comprehensive medical services for patients of all ages.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 pt-6 border-t border-gray-100">
              {credentials.map((credential, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-cyan-30-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-cyan-500"
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
                  <h4 className="font-medium text-gray-700 text-xs uppercase tracking-wide">
                    {credential.title}
                  </h4>
                  <p className="text-gray-500 text-xs">{credential.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Practice Philosophy */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-700 mb-3">
              Our Practice Philosophy
            </h2>
            <div className="w-12 h-0.5 bg-cyan-30-300 rounded-full mx-auto"></div>
            <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">
              Guided by principles that put your health and well-being first
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-5">
                <div className="w-14 h-14 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-cyan-500"
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
                <h3 className="text-base font-medium text-gray-700 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice Features */}
      <section className="bg-cyan-30 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-700 mb-3">
              Practice Features
            </h2>
            <div className="w-12 h-0.5 bg-cyan-30-300 rounded-full mx-auto"></div>
            <p className="text-gray-500 text-sm mt-4 max-w-2xl mx-auto">
              Designed with your comfort and convenience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {practiceFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-cyan-30-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-7 h-7 text-cyan-500"
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
                <h3 className="text-base font-medium text-gray-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-cyan-30 rounded-2xl p-6 sm:p-8">
              <div className="w-12 h-12 bg-cyan-30-200 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-600"
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
              <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-3">
                Our Mission
              </h2>
              <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mb-5"></div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                To serve our patients, team, and community with excellence -
                grounded in integrity, guided by professionalism, and driven by
                patient-centred innovation. We are committed to delivering
                accessible, comprehensive healthcare that evolves with the needs
                of the families we serve.
              </p>
              <div className="mt-6 pt-5 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3">
                  Our Commitment
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600 text-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-cyan-500 flex-shrink-0"
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
                  <li className="flex items-center text-gray-600 text-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-cyan-500 flex-shrink-0"
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
                  <li className="flex items-center text-gray-600 text-sm">
                    <svg
                      className="w-4 h-4 mr-2 text-cyan-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
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
            <div className="bg-cyan-30 rounded-2xl p-6 sm:p-8">
              <div className="w-12 h-12 bg-cyan-30-200 rounded-xl flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-cyan-600"
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
              <h2 className="text-xl sm:text-2xl font-medium text-gray-700 mb-3">
                Our Vision
              </h2>
              <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mb-5"></div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-5">
                To provide compassionate, efficient, and high-quality family
                medical care in Orleans - blending modern technology, premium
                service, and accessible care. We believe every family deserves
                care they can trust - care that grows with them and supports
                their health at every stage of life.
              </p>
              <div className="border-l-3 border-gray-400 pl-5">
                <p className="text-gray-700 italic text-sm sm:text-base">
                  "Building healthier families through dedicated, personalized
                  medical care."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Minimal */}
      <section className=" py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light  mb-3">
            Ready to become a patient?
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            Join our family of satisfied patients and experience compassionate
            care.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/appointment"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-cyan-600 text-white font-medium hover:bg-cyan-30-100 transition-all duration-200 text-sm"
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
          </div>
        </div>
      </section>
    </div>
  );
}
