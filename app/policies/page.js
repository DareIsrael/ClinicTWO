// policies/page.js - Completely Redesigned with Red Theme
export const metadata = {
  title: "Patient Information & Clinic Policies | Trim Medical Centre",
  description:
    "Comprehensive information about patient rights, responsibilities, and clinic policies",
};

export default function PoliciesPage() {
  const policySections = [
    {
      id: "patient-rights",
      title: "Patient Rights",
      subtitle: "As a patient, you have the right to:",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
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
      items: [
        {
          title: "Respect & Dignity",
          content: "Be treated with courtesy, compassion, and professionalism.",
        },
        {
          title: "Clear Communication",
          content:
            "Receive understandable information about your health, treatment options, and any costs associated with uninsured services.",
        },
        {
          title: "Privacy Protection (PHIPA)",
          content:
            "Your health information will be protected under the Personal Health Information Protection Act (PHIPA). Your records are stored securely and accessed only when necessary for your care.",
        },
        {
          title: "Access to Your Records",
          content:
            "You may request copies of your medical records or corrections to inaccuracies (fees may apply for copies).",
        },
        {
          title: "Involvement in Care",
          content:
            "Participate in decisions about your treatment and care plan.",
        },
        {
          title: "Safe Environment",
          content:
            "Expect a safe, harassment-free, discrimination-free environment.",
        },
      ],
    },
    {
      id: "patient-responsibilities",
      title: "Patient Responsibilities",
      subtitle: "To help us care for you effectively, we ask that you:",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      items: [
        {
          title: "Respectful Conduct",
          content:
            "Treat staff, physicians, and other patients with courtesy. Zero tolerance for verbal abuse, threats, or harassment.",
        },
        {
          title: "Accurate Information",
          content:
            "Keep your demographic, health card, medication, and contact information up to date.",
        },
        {
          title: "Collaboration",
          content:
            "Follow your treatment plan. Ask questions when unclear. Inform us of changes in your health, medications, or hospital visits.",
        },
      ],
    },
    {
      id: "appointment-policy",
      title: "Appointment, Late & No-Show Policy",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
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
      items: [
        {
          title: "Arrivals",
          content:
            "Please arrive 10 minutes early to complete forms and prepare for your appointment.",
        },
        {
          title: "Late Arrivals",
          content:
            "Patients arriving more than 10 minutes late may be asked to reschedule out of fairness to others.",
        },
        {
          title: "Cancellations",
          content: "Contact us at least 24 hours before your appointment.",
        },
        {
          title: "No-Shows",
          content:
            "Missed appointments WILL result in fees ($30 CAD) and no further appointments unless PAID. Three no shows results in a warning. Four no shows results in an automatic de-rostering.",
        },
      ],
    },
    {
      id: "prescription-policy",
      title: "Prescription Renewal Policy",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
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
      items: [
        {
          content: "Request renewals through your pharmacy (subject to change)",
        },
        { content: "Allow 3–5 business days for processing." },
        { content: "Urgent renewals may not be guaranteed." },
        { content: "Walk-in renewals are not always possible." },
      ],
    },
    {
      id: "non-ohip-services",
      title: "Non-OHIP / Uninsured Services",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      items: [
        {
          content:
            "Some services are not covered by OHIP. Common examples include:",
        },
        {
          list: [
            "Driver's medical forms",
            "Employment and insurance forms",
            "Sick notes",
            "Travel-related forms",
            "Third-party requests",
            "Transfer of medical records",
          ],
        },
        {
          content:
            "A full fee list is available at reception and will be provided before completing any service.",
        },
      ],
    },
    {
      id: "clinic-conduct",
      title: "Clinic Conduct Policies",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
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
      items: [
        {
          title: "Phones & Recording",
          content:
            "Phones must be on silent. No recording (audio/video) anywhere inside the clinic. No speakerphone calls.",
        },
        {
          title: "Fragrance-Free Clinic",
          content:
            "Strong fragrances can trigger allergies or sensitivities. Please avoid perfumes, scented sprays, or strongly scented lotions.",
        },
        {
          title: "Food & Cleanliness",
          content: "No food in waiting areas. Drinks must have lids.",
        },
      ],
    },
    {
      id: "privacy-policy",
      title: "Privacy Policy (PHIPA)",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      items: [
        {
          content:
            "We follow all guidelines under the Personal Health Information Protection Act:",
        },
        {
          list: [
            "Your information is confidential.",
            "Records are securely stored.",
            "Information is shared only with consent or when legally required.",
            "You may request access or corrections.",
            "Concerns may be directed to the Clinic Manager.",
          ],
        },
      ],
    },
    {
      id: "accessibility",
      title: "Accessibility & Inclusion",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      items: [
        { content: "We welcome patients of all backgrounds and abilities." },
        {
          list: [
            "Wheelchair-accessible building",
            "Service animals welcome",
            "Interpretation or communication assistance available upon request",
            "Staff trained to support diverse patient needs",
          ],
        },
      ],
    },
  ];

  const additionalSections = [
    {
      title: "How to Prepare for Your Visit",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      items: [
        { content: "Bringing the following helps ensure smooth care:" },
        {
          list: [
            "Valid OHIP card",
            "List of medications or medication bottles",
            "Any recent test results",
            "A list of concerns/questions",
            "Baby immunization cards (if applicable)",
            "Interpreter if needed",
          ],
        },
      ],
    },
    {
      title: "After-Hours Instructions",
      icon: (
        <svg
          className="w-6 h-6 sm:w-8 sm:h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      items: [
        { content: "If this is an emergency, call 911." },
        {
          content:
            "For urgent but non-emergency care, visit your nearest urgent care clinic or emergency department.",
        },
        {
          content:
            "For minor, non-urgent concerns, please leave a message or use the appropriate online system (if available).",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean, No Background Image */}
      <section className="bg-red-50/30 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-1.5 rounded-full mb-6 mx-auto lg:mx-0">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              <span className="text-xs font-medium text-red-400 uppercase tracking-wide">
                Clinic Information
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Patient Information &<br />
              <span className="text-red-400">Clinic Policies</span>
            </h1>
            <div className="w-16 h-1 bg-red-400 rounded-full mb-6 mx-auto lg:mx-0"></div>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Comprehensive, professional, and aligned with CPSO + PHIPA + OMA
              guidelines
            </p>
            <div className="bg-white rounded-xl p-6 border-l-4 border-red-600 shadow-sm max-w-2xl mx-auto lg:mx-0">
              <p className="text-gray-700 font-medium italic text-center lg:text-left">
                "We are committed to providing compassionate, efficient, and
                high-quality care for every patient."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center lg:text-left">
              Welcome to Trim Medical Centre
            </h2>
            <div className="w-16 h-1 bg-red-400 rounded-full mb-6 mx-auto lg:mx-0"></div>
            <p className="text-gray-600 leading-relaxed">
              We are committed to providing compassionate, efficient, and
              high-quality care for every patient. Below is a clear outline of
              your rights, responsibilities, and our clinic's operational
              policies so you always know what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="space-y-8">
            {policySections.map((section, index) => (
              <div key={index} id={section.id} className="scroll-mt-20">
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-400">
                        {section.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {section.title}
                        </h2>
                        {section.subtitle && (
                          <p className="text-sm text-gray-500 mt-0.5">
                            {section.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="border-l-4 border-red-300 pl-4"
                        >
                          {item.title && (
                            <h3 className="text-base font-semibold text-gray-900 mb-2">
                              {item.title}
                            </h3>
                          )}

                          {item.content && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.content}
                            </p>
                          )}

                          {item.list && (
                            <ul className="space-y-1 mt-2">
                              {item.list.map((listItem, listIndex) => (
                                <li
                                  key={listIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-red-400 text-sm mt-0.5">
                                    •
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {listItem}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Sections in Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {additionalSections.map((section, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-400">
                        {section.icon}
                      </div>
                      <h2 className="text-lg font-bold text-gray-900">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item.content && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-2">
                              {item.content}
                            </p>
                          )}

                          {item.list && (
                            <ul className="space-y-1">
                              {item.list.map((listItem, listIndex) => (
                                <li
                                  key={listIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-red-400 text-sm mt-0.5">
                                    •
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {listItem}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-400 py-16">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Questions About Our Policies?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Our team is here to help you understand our policies and ensure you
            have the best possible experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-red-400 font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
            <a
              href="/uninsured-services"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200"
            >
              View Service Fees
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
