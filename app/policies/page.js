// policies/page.js - Completely redesigned with Clean UI
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
      {/* Hero Section - Minimal */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-30-100 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-cyan-30-600 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
              Clinic Information
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-3 tracking-tight">
            Patient Information & Policies
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            Comprehensive information about your rights, responsibilities, and
            our clinic policies
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cyan-30 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-light text-gray-700 mb-4">
              Welcome to Trim Medical Centre
            </h2>
            <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mb-5"></div>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              We are committed to providing compassionate, efficient, and
              high-quality care for every patient. Below is a clear outline of
              your rights, responsibilities, and our clinic's operational
              policies so you always know what to expect.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16 bg-cyan-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {policySections.map((section, index) => (
              <div key={index} id={section.id} className="scroll-mt-20">
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div className="bg-cyan-30 px-5 py-3 border-b border-gray-100">
                    <h2 className="text-base font-medium text-gray-700">
                      {section.title}
                    </h2>
                    {section.subtitle && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {section.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="space-y-3">
                      {section.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="pl-3 border-l-2 border-gray-200"
                        >
                          {item.title && (
                            <h3 className="text-sm font-medium text-gray-700 mb-1">
                              {item.title}
                            </h3>
                          )}

                          {item.content && (
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {item.content}
                            </p>
                          )}

                          {item.list && (
                            <ul className="space-y-1 mt-1">
                              {item.list.map((listItem, listIndex) => (
                                <li
                                  key={listIndex}
                                  className="flex items-start gap-2"
                                >
                                  <span className="text-gray-400 text-sm mt-0.5">
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
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                >
                  <div className="bg-cyan-30 px-5 py-3 border-b border-gray-100">
                    <h2 className="text-base font-medium text-gray-700">
                      {section.title}
                    </h2>
                  </div>

                  <div className="p-5">
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
                                  <span className="text-gray-400 text-sm mt-0.5">
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
      <section className="bg-cyan-30-900 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light text-white mb-3">
            Questions About Our Policies?
          </h2>
          <p className=" text-sm mb-6 max-w-md mx-auto">
            Our team is here to help you understand our policies and ensure you
            have the best possible experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-gray-700 font-medium hover:bg-cyan-30-100 transition-all duration-200 text-sm"
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
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-gray-600 font-medium hover:bg-cyan-30-800 transition-all duration-200 text-sm"
            >
              View Service Fees
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
