// uninsured-services/page.js - Completely Redesigned with Red Theme
export const metadata = {
  title: 'Uninsured Services & Fees | Trim Medical Centre',
  description: 'Information about services not covered by OHIP and associated fees',
};

export default function UninsuredServicesPage() {
  const whySection = {
    title: 'Why some services are not covered by OHIP',
    content: `At Trim Medical Centre, most of the care you receive is covered by the Ontario Health Insurance Plan (OHIP). However, OHIP does not pay for certain services, forms, notes, and reports - especially when they are requested by employers, schools, insurers, or other third parties. In those cases, the cost is the responsibility of the patient or the third party requesting the service. Our fees for uninsured services follow the Ontario Medical Association (OMA) recommended fee guide.`,
    icon: (
      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  };

  const services = [
    {
      category: 'Medical Notes & Certificates',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      items: [
        { service: 'Sick note / Return-to-work or school note', fee: '$40' },
        { service: 'Certificate of freedom from communicable disease', fee: '$40' },
        { service: 'Fitness-to-work note (more detailed)', fee: 'From $50.00' },
      ]
    },
    {
      category: 'Forms & Reports',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      items: [
        { service: 'School / Camp / Daycare physical form', fee: '$40' },
        { service: 'University / International student admission forms', fee: '$40' },
        { service: 'Pre-employment fitness / Fitness club forms', fee: '$50' },
        { service: 'Hospital / Nursing-home employment forms', fee: '$50' },
        { service: "Driver's medical – form only", fee: '$75' },
        { service: 'Travel insurance cancellation form', fee: '$160' },
        { service: 'Employment Insurance (EI) sickness benefits', fee: '$50' },
        { service: 'EI compassionate care medical certificate', fee: '$72' },
        { service: 'Disability Tax Credit (T2201)', fee: 'From $150' },
      ]
    },
    {
      category: 'Exams and Third-Party Evaluations',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      items: [
        { service: 'Practice admission interview', fee: '$150' },
        { service: 'Pre-adoption exam & evaluation (CAS)', fee: '$246' },
      ]
    },
    {
      category: 'Tuberculosis (TB) Testing for Employment',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      note: 'We will let you know in advance if your TB test is considered an insured or uninsured service.',
      description: 'Some TB tests are insured by OHIP when medically necessary. However, when a TB skin test is requested solely for employment purposes, it is not covered by OHIP.',
      items: [
        { service: 'TB skin test + employment form - One step', fee: '$45' },
        { service: 'TB skin test + employment form - Two step', fee: '$80' },
      ]
    },
    {
      category: 'Medical Records & Documentation',
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      items: [
        { service: 'Copy of your medical records', fee: '$30 for first 20 pages + $0.25/page thereafter' },
        { service: 'Physician review/summarizing of records', fee: '$45 per 15 minutes' },
        { service: 'Courier / shipping costs', fee: 'At cost' },
      ]
    }
  ];

  const additionalSections = [
    {
      title: 'Missed Appointments',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: `OHIP does not pay for missed or late appointments. Our clinic will charge a missed appointment fee for appointments that are not cancelled with sufficient notice i.e same day cancellation or no show. This helps us manage physician time and offer appointments to other patients in need.`
    },
    {
      title: 'Travel Medicine & Other Uninsured Clinical Services',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
        </svg>
      ),
      content: `Some clinical visits are uninsured because of the reason for the visit, such as: Travel health consultations, Non-insured vaccines, Certain employment-related assessments. We will always inform you in advance if a visit or service is uninsured.`
    },
    {
      title: 'Questions About Fees?',
      icon: (
        <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      content: `If you're unsure whether something is covered by OHIP or subject to an uninsured fee, please ask our team. We're happy to explain what is insured, what isn't, and how the fees are calculated.`
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clean, No Background Image */}
      <section className="bg-red-50/30 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-1.5 rounded-full mb-6 mx-auto lg:mx-0">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
              <span className="text-xs font-medium text-red-600 uppercase tracking-wide">Fee Information</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Uninsured Services<br />
              <span className="text-red-600">& Fees</span>
            </h1>
            <div className="w-16 h-1 bg-red-600 rounded-full mb-6 mx-auto lg:mx-0"></div>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Information about services not covered by OHIP and associated fees at Trim Medical Centre
            </p>
            <div className="bg-white rounded-xl p-6 border-l-4 border-red-600 shadow-sm max-w-2xl mx-auto lg:mx-0">
              <p className="text-gray-700 font-medium italic text-center lg:text-left">
                "Transparent pricing for non-OHIP services following OMA guidelines"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
              <div className="flex-shrink-0 w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                {whySection.icon}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {whySection.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {whySection.content}
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-red-50/30 rounded-xl border border-red-200">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> Fees are based on the OMA 2025 recommendations and may change if the OMA updates its guide. We will always inform you of any fee before proceeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Fees */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Uninsured Services & Fees</h2>
            <div className="w-12 h-1 bg-red-600 rounded-full mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Below are some of the most common uninsured services we provide
            </p>
          </div>

          <div className="space-y-8">
            {services.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  {category.description && (
                    <div className="mb-6 p-4 bg-red-50/20 rounded-xl border border-red-200">
                      <p className="text-sm text-gray-700">{category.description}</p>
                    </div>
                  )}
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Service</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 w-32">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {category.items.map((item, itemIndex) => (
                          <tr key={itemIndex} className="hover:bg-gray-50 transition-colors">
                            <td className="py-3 px-4 text-sm text-gray-600">{item.service}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
                                {item.fee}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {category.note && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-sm text-gray-600 italic">{category.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalSections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-red-200 transition-all duration-300">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-4">
                  {section.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{section.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-16">
        <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need Clarification About Fees?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            We're happy to explain what is insured, what isn't, and how the fees are calculated.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-red-600 font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md"
            >
              Contact Us
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="/appointment"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}