// about/page.js - Completely redesigned with Clean UI
"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const credentials = [
    {
      title: t("about_cred_medical_degree"),
      value: t("about_cred_medical_degree_val"),
    },
    {
      title: t("about_cred_public_health"),
      value: t("about_cred_public_health_val"),
    },
    {
      title: t("about_cred_uk"),
      value: t("about_cred_uk_val"),
    },
    {
      title: t("about_cred_ca"),
      value: t("about_cred_ca_val"),
    },
  ];

  const values = [
    {
      title: t("val_patient_centered"),
      description: t("val_patient_centered_desc"),
    },
    {
      title: t("val_continuity"),
      description: t("val_continuity_desc"),
    },
    {
      title: t("val_evidence"),
      description: t("val_evidence_desc"),
    },
    {
      title: t("val_compassionate"),
      description: t("val_compassionate_desc"),
    },
  ];


  const practiceFeatures = [
    {
      title: t("feat_sameday"),
      description: t("feat_sameday_desc"),
    },
    {
      title: t("feat_ohip"),
      description: t("feat_ohip_desc"),
    },
    {
      title: t("feat_comprehensive"),
      description: t("feat_comprehensive_desc"),
    },
    {
      title: t("feat_welcoming"),
      description: t("feat_welcoming_desc"),
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
              {t("about_badge")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-3 tracking-tight">
            {t("about_title")}
          </h1>
          <p className="text-gray-500 text-base max-w-2xl mx-auto">
            {t("about_subtitle")}
          </p>
        </div>
      </div>



      {/* Meet Our Physician Section */}
      <section className="bg-cyan-30 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-700 mb-3">
              {t("about_meet_physician")}
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
                {t("about_dr_name")}
              </h3>
              <p className="text-gray-500 text-sm mb-1">{t("about_dr_role")}</p>
              <p className="text-gray-400 text-xs mb-4">{t("about_dr_credentials")}</p>
            </div>

            <div className="text-left max-w-2xl mx-auto space-y-4">
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {t("about_dr_bio_1")}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {t("about_dr_bio_2")}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {t("about_dr_bio_3")}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {t("about_dr_bio_4")}
              </p>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {t("about_dr_bio_5")}
              </p>
              <p className="text-gray-500 text-sm italic mt-2">
                {t("about_dr_location")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-6 border-t border-gray-100">
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
