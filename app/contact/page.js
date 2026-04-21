// contact/page.js - Completely Redesigned
"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Visit Our Clinic",
      details: ["1280 Trim Rd, Unit B, ", "Orleans, ON K4A 3N3"],
      description: "Free parking available nearby",
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
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Call Us",
      details: ["Main: (343) 224-4070", "Fax: (888) 615-1221"],
      description: "Same-day appointments available",
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
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Us",
      details: ["contact@trimmedicalcenter.ca"],
      description: "We respond within 24 hours",
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Opening Hours",
      details: [
        "Mon-Thu: 10am - 7pm",
        "Friday: 10am - 5pm",
        "Saturday: 10am - 3pm",
      ],
      description: "Sunday: Closed",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Reduced top padding */}
      <section className="relative bg-red-50/20 pt-12 pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-700 text-sm font-medium mb-4">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Get in Touch
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
              Contact
              <br />
              <span className="text-red-400">Trim Medical Centre</span>
            </h1>
            <div className="w-16 h-1 bg-red-400 rounded-full mb-5"></div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're here to help you with all your healthcare needs. Get in
              touch with us today for appointments, inquiries, or medical
              concerns.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards - Reduced top padding */}
      <section className="py-2 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-400 group-hover:scale-105 transition-all duration-300">
                  <div className="text-red-400 group-hover:text-white transition-colors">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                {info.description && (
                  <p className="text-xs text-red-400 font-medium mt-2">
                    {info.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section - Reduced padding */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h2>
              <div className="w-12 h-1 bg-red-400 rounded-full mb-5"></div>

              {submitStatus === "success" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Thank you for your message! We'll get back to you within 24
                    hours.
                  </div>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-5">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    There was an error sending your message. Please try again or
                    contact us directly.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-200 bg-white text-gray-900"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-200 bg-white text-gray-900"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-200 bg-white text-gray-900"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">Appointment Inquiry</option>
                    <option value="prescription">Prescription Refill</option>
                    <option value="medical-records">Medical Records</option>
                    <option value="billing">Billing Question</option>
                    <option value="referral">Specialist Referral</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 transition duration-200 resize-none bg-white text-gray-900"
                    placeholder="Please describe your inquiry in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-red-400 text-white py-3.5 px-6 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 transition duration-300 font-semibold"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending Message...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-5">
              {/* Map */}
              <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Our Location
                </h3>
                <div className="bg-gray-100 h-56 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg
                      className="w-14 h-14 mx-auto mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    <p className="font-medium text-gray-700">Interactive Map</p>
                    <p className="text-xs text-gray-500 mt-1">
                      1280 Trim Rd, Unit B, Orleans, ON K4A 3N3
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <a
                    href="https://maps.google.com/?q=1280+Trim+Rd+Orleans+ON"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-400 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    Get Directions
                    <svg
                      className="w-4 h-4 ml-1"
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
                </div>
              </div>

              {/* Emergency Info */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-red-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-red-800 mb-1">
                      Medical Emergency
                    </h3>
                    <p className="text-red-700 text-xs mb-2">
                      For urgent medical concerns that require immediate
                      attention, please call 911 or visit your nearest emergency
                      department.
                    </p>
                    <div className="text-base font-bold text-red-800">
                      Call 911 for Emergencies
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-red-50/30 rounded-2xl p-5 border border-red-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3">
                  Quick Contact
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-red-400"
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
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Appointments</p>
                      <a
                        href="tel:3438873470"
                        className="text-gray-900 font-medium hover:text-red-400 transition-colors text-sm"
                      >
                        (343) 224-4070
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <a
                        href="mailto:contact@trimmedicalcenter.ca"
                        className="text-gray-900 font-medium hover:text-red-400 transition-colors text-xs"
                      >
                        contact@trimmedicalcenter.ca
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Fax</p>
                      <p className="text-gray-900 font-medium text-sm">
                        (888) 615-1221
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Reduced padding */}
      <section className="bg-red-400 py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
            Need Immediate Assistance?
          </h2>
          <p className="text-white/90 mb-6">
            Call us directly to speak with our friendly staff about appointments
            or inquiries.
          </p>
          <a
            href="tel:+13438873470"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white text-red-400 font-semibold hover:bg-gray-100 transition-all duration-200 shadow-md"
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
      </section>
    </div>
  );
}
