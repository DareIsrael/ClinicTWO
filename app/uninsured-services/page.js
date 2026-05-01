// uninsured-services/page.js - Completely redesigned with Clean UI
export const metadata = {
  title: "Uninsured Services & Fees | Trim Medical Centre",
  description:
    "Information about services not covered by OHIP and associated fees",
};

export default function UninsuredServicesPage() {
  const whySection = {
    title: "Why some services are not covered by OHIP",
    content: `At Trim Medical Centre, most of the care you receive is covered by the Ontario Health Insurance Plan (OHIP). However, OHIP does not pay for certain services, forms, notes, and reports - especially when they are requested by employers, schools, insurers, or other third parties. In those cases, the cost is the responsibility of the patient or the third party requesting the service. Our fees for uninsured services follow the Ontario Medical Association (OMA) recommended fee guide.`,
  };

  const services = [
    {
      category: "Medical Notes & Certificates",
      items: [
        { service: "Sick note / Return-to-work or school note", fee: "$40" },
        {
          service: "Certificate of freedom from communicable disease",
          fee: "$40",
        },
        { service: "Fitness-to-work note (more detailed)", fee: "From $50" },
      ],
    },
    {
      category: "Forms & Reports",
      items: [
        { service: "School / Camp / Daycare physical form", fee: "$40" },
        {
          service: "University / International student admission forms",
          fee: "$40",
        },
        { service: "Pre-employment fitness / Fitness club forms", fee: "$50" },
        { service: "Hospital / Nursing-home employment forms", fee: "$50" },
        { service: "Driver's medical – form only", fee: "$75" },
        { service: "Travel insurance cancellation form", fee: "$160" },
        { service: "Employment Insurance (EI) sickness benefits", fee: "$50" },
        { service: "EI compassionate care medical certificate", fee: "$72" },
        { service: "Disability Tax Credit (T2201)", fee: "From $150" },
      ],
    },
    {
      category: "Exams and Third-Party Evaluations",
      items: [
        { service: "Practice admission interview", fee: "$150" },
        { service: "Pre-adoption exam & evaluation (CAS)", fee: "$246" },
      ],
    },
    {
      category: "Tuberculosis (TB) Testing for Employment",
      note: "Some TB tests are insured by OHIP when medically necessary. However, when a TB skin test is requested solely for employment purposes, it is not covered by OHIP.",
      items: [
        { service: "TB skin test + employment form - One step", fee: "$45" },
        { service: "TB skin test + employment form - Two step", fee: "$80" },
      ],
    },
    {
      category: "Medical Records & Documentation",
      items: [
        {
          service: "Copy of your medical records",
          fee: "$30 for first 20 pages + $0.25/page thereafter",
        },
        {
          service: "Physician review/summarizing of records",
          fee: "$45 per 15 minutes",
        },
        { service: "Courier / shipping costs", fee: "At cost" },
      ],
    },
  ];

  const additionalSections = [
    {
      title: "Missed Appointments",
      content: `OHIP does not pay for missed or late appointments. Our clinic will charge a missed appointment fee for appointments that are not cancelled with sufficient notice i.e same day cancellation or no show.`,
    },
    {
      title: "Travel Medicine & Other Uninsured Services",
      content: `Some clinical visits are uninsured because of the reason for the visit, such as: Travel health consultations, Non-insured vaccines, and certain employment-related assessments.`,
    },
    {
      title: "Questions About Fees?",
      content: `If you're unsure whether something is covered by OHIP or subject to an uninsured fee, please ask our team. We're happy to explain what is insured, what isn't, and how the fees are calculated.`,
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
              Fee Information
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-3 tracking-tight">
            Uninsured Services
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
            Information about services not covered by OHIP and associated fees
          </p>
        </div>
      </div>

      {/* Why Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cyan-30 rounded-2xl p-6 sm:p-8">
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl font-light text-gray-700 mb-4">
                Why some services are not covered by OHIP
              </h2>
              <div className="w-10 h-0.5 bg-cyan-30-300 rounded-full mb-5"></div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {whySection.content}
              </p>
            </div>

            <div className="mt-6 p-4 bg-cyan-30-100 rounded-lg">
              <div className="flex items-start gap-3">
                <svg
                  className="w-4 h-4  flex-shrink-0 mt-0.5 "
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
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Note:</span> Fees are based on
                  the OMA 2025 recommendations. We will always inform you of any
                  fee before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Fees */}
      <section className="py-12 sm:py-16 bg-cyan-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-light text-gray-700 mb-3">
              Common Uninsured Services & Fees
            </h2>
            <div className="w-12 h-0.5 bg-cyan-30-300 rounded-full mx-auto"></div>
          </div>

          <div className="space-y-6">
            {services.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 overflow-hidden"
              >
                <div className="bg-cyan-30 px-5 py-3 border-b border-gray-100">
                  <h3 className="text-base font-medium text-gray-700">
                    {category.category}
                  </h3>
                </div>

                <div className="p-5">
                  {category.note && (
                    <div className="mb-4 p-3 bg-cyan-30 rounded-lg text-sm text-gray-600">
                      {category.note}
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="text-left py-2 px-3 text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                            Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {category.items.map((item, itemIndex) => (
                          <tr
                            key={itemIndex}
                            className="hover:bg-cyan-30 transition-colors"
                          >
                            <td className="py-2 px-3 text-sm text-gray-600">
                              {item.service}
                            </td>
                            <td className="py-2 px-3">
                              <span className="text-sm font-medium text-gray-700">
                                {item.fee}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalSections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 bg-cyan-30-200 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-5 h-5 text-cyan-600"
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
                  {section.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light  mb-3">
            Need Clarification About Fees?
          </h2>
          <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
            We're happy to explain what is insured, what isn't, and how the fees
            are calculated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-white text-gray-700 font-medium hover:bg-cryan-30-100 transition-all duration-200 text-sm"
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
              href="/appointment"
              className="bg-cyan-800 inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-gray-600 text-white font-medium hover:bg-cyan-30-800 transition-all duration-200 text-sm"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
