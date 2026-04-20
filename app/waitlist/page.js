'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    healthcareProvince: '',
    healthcareNumber: '',
    dateOfBirth: '',
    cellPhone: '',
    address: '',
    country: '',
    postalCode: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'Canada', label: 'Canada' },
    { value: 'USA', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Australia', label: 'Australia' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
    if (successMessage) setSuccessMessage('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.healthcareProvince.trim()) newErrors.healthcareProvince = 'Healthcare province is required';
    if (!formData.healthcareNumber.trim()) newErrors.healthcareNumber = 'Healthcare number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.cellPhone.trim()) newErrors.cellPhone = 'Cell phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';

    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      if (dob > today) newErrors.dateOfBirth = 'Date of birth cannot be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const response = await fetch('/api/waitlist/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setSuccessMessage('Successfully joined waitlist! Redirecting...');
        setTimeout(() => router.push('/waiting-list-confirmation'), 1500);
      } else {
        if (result.message?.includes('already on our waitlist') || result.message?.includes('duplicate')) {
          setErrors({ submit: 'This email is already on our waitlist. Please use a different email.' });
        } else {
          setErrors({ submit: result.message || 'Failed to join waitlist. Please try again.' });
        }
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type, value, onChange, error, required, placeholder, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2.5 bg-white border rounded-xl transition-all duration-200 text-gray-700 text-sm
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'}
            focus:outline-none`}
        >
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 bg-white border rounded-xl transition-all duration-200 text-gray-700 text-sm
            ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20'}
            focus:outline-none placeholder:text-gray-400`}
        />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">Trim Medical Centre</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section - Clean & Minimal */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary-light px-4 py-1.5 rounded-full mb-5">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span className="text-xs font-medium text-primary">Limited Availability</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Join the Waitlist
          </h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Be the first to know when new patient spots open up
          </p>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                    <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Accordion-style sections */}
              <div className="space-y-5">
                {/* Personal Info */}
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Personal Information</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="First Name"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        required={true}
                        placeholder="John"
                      />
                      <InputField
                        label="Last Name"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        required={true}
                        placeholder="Doe"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Gender"
                        type="select"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        error={errors.gender}
                        required={true}
                        options={genderOptions}
                      />
                      <InputField
                        label="Date of Birth"
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        error={errors.dateOfBirth}
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Contact Information</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <InputField
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required={true}
                      placeholder="john@example.com"
                    />
                    <InputField
                      label="Phone Number"
                      type="tel"
                      name="cellPhone"
                      value={formData.cellPhone}
                      onChange={handleChange}
                      error={errors.cellPhone}
                      required={true}
                      placeholder="+1 (555) 123-4567"
                    />
                    <InputField
                      label="Street Address"
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      error={errors.address}
                      required={true}
                      placeholder="123 Main Street"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Country"
                        type="select"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        error={errors.country}
                        required={true}
                        options={countryOptions}
                      />
                      <InputField
                        label="Postal Code"
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        error={errors.postalCode}
                        required={true}
                        placeholder="A1B 2C3"
                      />
                    </div>
                  </div>
                </div>

                {/* Healthcare Info */}
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-5 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-900">Healthcare Information</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Province"
                        type="text"
                        name="healthcareProvince"
                        value={formData.healthcareProvince}
                        onChange={handleChange}
                        error={errors.healthcareProvince}
                        required={true}
                        placeholder="Ontario"
                      />
                      <InputField
                        label="Health Card Number"
                        type="text"
                        name="healthcareNumber"
                        value={formData.healthcareNumber}
                        onChange={handleChange}
                        error={errors.healthcareNumber}
                        required={true}
                        placeholder="1234 567 890 AB"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all duration-200 font-semibold text-sm shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Join Waitlist
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                By joining, you agree to our privacy policy. No spam, unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Right Column - Benefits Card */}
          <div className="lg:pl-4">
            <div className="bg-gradient-to-br from-primary/5 to-primary-light/30 rounded-2xl p-6 md:p-8 border border-primary/10">
              {/* Simple icon header - no "Priority Access" background */}
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Why Join Our Waitlist?</h2>
              <p className="text-gray-500 text-sm mb-6">Get notified first when new patient spots become available.</p>

              {/* Benefits List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary-light rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Priority Notification</p>
                    <p className="text-gray-500 text-xs">Be the first to know when spots open</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary-light rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Simple & Fast</p>
                    <p className="text-gray-500 text-xs">Fill out the form in under 2 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary-light rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">No Commitment</p>
                    <p className="text-gray-500 text-xs">Join for free, unsubscribe anytime</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary-light rounded-full flex items-center justify-center mt-0.5">
                    <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Secure & Confidential</p>
                    <p className="text-gray-500 text-xs">Your information is safe with us</p>
                  </div>
                </div>
              </div>

              {/* Wait Time Card */}
              

              {/* Testimonial */}
              <div className="border-t border-primary/10 pt-5">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">"Easy process! Got notified within 1 week and now I'm a registered patient."</p>
                <p className="text-gray-400 text-xs mt-2">— Michael Chen</p>
              </div>
            </div>

            {/* Contact Card */}
            <div className="mt-5 bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Need help? Call us</p>
                  <a href="tel:+13438873470" className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
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