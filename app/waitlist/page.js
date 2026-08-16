"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

const InputField = ({

  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
  placeholder,
  options,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1.5">
      {label} {required && <span className="text-cyan-600">*</span>}
    </label>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 bg-white border rounded-lg transition-all duration-200 text-gray-700 text-sm
          ${error ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"}
          focus:outline-none`}
      >
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 bg-white border rounded-lg transition-all duration-200 text-gray-700 text-sm
          ${error ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/20"}
          focus:outline-none placeholder:text-gray-400`}
      />
    )}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function WaitlistPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({

    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    healthcareProvince: "",
    healthcareNumber: "",
    dateOfBirth: "",
    cellPhone: "",
    address: "",
    country: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const genderOptions = [
    { value: "", label: t("select_gender") },
    { value: "Male", label: t("gender_male") },
    { value: "Female", label: t("gender_female") },
    { value: "Other", label: t("gender_other") },
  ];

  const countryOptions = [
    { value: "", label: t("select_country") },
    { value: "Canada", label: t("country_canada") },
    { value: "USA", label: t("country_usa") },
    { value: "UK", label: t("country_uk") },
    { value: "Australia", label: t("country_australia") },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (successMessage) setSuccessMessage("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = t("err_first_name_req");
    if (!formData.lastName.trim()) newErrors.lastName = t("err_last_name_req");
    if (!formData.email.trim()) newErrors.email = t("err_email_req");
    if (!formData.gender) newErrors.gender = t("err_gender_req");
    if (!formData.healthcareProvince.trim())
      newErrors.healthcareProvince = t("err_province_req");
    if (!formData.healthcareNumber.trim())
      newErrors.healthcareNumber = t("err_health_num_req");
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = t("err_dob_req");
    if (!formData.cellPhone.trim())
      newErrors.cellPhone = t("err_phone_req");
    if (!formData.address.trim()) newErrors.address = t("err_address_req");
    if (!formData.country) newErrors.country = t("err_country_req");
    if (!formData.postalCode.trim())
      newErrors.postalCode = t("err_postal_req");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email))
      newErrors.email = t("err_email_valid");

    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today)
        newErrors.dateOfBirth = t("err_dob_future");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage("");

    try {
      const response = await fetch("/api/waitlist/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Successfully joined waitlist! Redirecting...");
        setTimeout(() => router.push("/waiting-list-confirmation"), 1500);
      } else {
        if (
          result.message?.includes("already on our waitlist") ||
          result.message?.includes("duplicate")
        ) {
          setErrors({
            submit:
              "This email is already on our waitlist. Please use a different email.",
          });
        } else {
          setErrors({
            submit:
              result.message || "Failed to join waitlist. Please try again.",
          });
        }
      }
    } catch (error) {
      setErrors({ submit: "An unexpected error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-30 via-white to-blue-50">
      {/* Hero Section - Clean & Minimal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white shadow-sm px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-cyan-600 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-cyan-600 uppercase tracking-wide">
              Limited Availability
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-4 tracking-tight">
            {t("waitlist_title")}
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            {t("waitlist_subtitle")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-green-700 text-sm">{successMessage}</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errors.submit && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-red-600"
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
                  </div>
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Personal Information */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={t("form_first_name")}
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      error={errors.firstName}
                      required
                      placeholder="John"
                    />
                    <InputField
                      label={t("form_last_name")}
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      error={errors.lastName}
                      required
                      placeholder="Doe"
                    />
                    <InputField
                      label={t("form_gender")}
                      type="select"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      error={errors.gender}
                      required
                      options={genderOptions}
                    />
                    <InputField
                      label={t("form_dob")}
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      error={errors.dateOfBirth}
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pt-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-cyan-600"
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
                    Contact Information
                  </h3>
                  <InputField
                    label={t("form_email")}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    placeholder="john@example.com"
                  />
                  <InputField
                    label={t("form_phone")}
                    type="tel"
                    name="cellPhone"
                    value={formData.cellPhone}
                    onChange={handleChange}
                    error={errors.cellPhone}
                    required
                    placeholder="+1 (555) 123-4567"
                  />
                  <InputField
                    label={t("form_address")}
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    error={errors.address}
                    required
                    placeholder="123 Main Street"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={t("form_country")}
                      type="select"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      error={errors.country}
                      required
                      options={countryOptions}
                    />
                    <InputField
                      label={t("form_postal")}
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      error={errors.postalCode}
                      required
                      placeholder="A1B 2C3"
                    />
                  </div>
                </div>

                {/* Healthcare Information */}
                <div className="pt-2">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-cyan-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Healthcare Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      label={t("form_province")}
                      type="text"
                      name="healthcareProvince"
                      value={formData.healthcareProvince}
                      onChange={handleChange}
                      error={errors.healthcareProvince}
                      required
                      placeholder="Ontario"
                    />
                    <InputField
                      label={t("form_health_num")}
                      type="text"
                      name="healthcareNumber"
                      value={formData.healthcareNumber}
                      onChange={handleChange}
                      error={errors.healthcareNumber}
                      required
                      placeholder="1234 567 890 AB"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-200 font-medium text-sm shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t("btn_submitting")}
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
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
                    {t("btn_submit_registration")}
                  </>
                )}
              </button>


              <p className="text-center text-xs text-gray-400 mt-4">
                By joining, you agree to our privacy policy.
              </p>
            </form>
          </div>

          {/* Right Column - Benefits */}
          <div className="space-y-6">
            {/* Clinic Logo */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 md:p-10 shadow-sm flex items-center justify-center">
              <img
                src="/TrimLOGO11.svg"
                alt="Trim Medical Centre Logo"
                className="w-full max-w-xs md:max-w-sm h-auto"
              />
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-50 rounded-xl flex items-center justify-center">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Need help? Call us</p>
                  <a
                    href="tel:+13438873470"
                    className="text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
                  >
                    (343) 224-4070
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
