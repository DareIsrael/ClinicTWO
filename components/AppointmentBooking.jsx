'use client';
import { useState, useEffect } from 'react';

export default function AppointmentBooking() {
  // State management
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [otherProvince, setOtherProvince] = useState('');
  const [hoveredDate, setHoveredDate] = useState(null);

  // Form data
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
    country: 'Canada',
    postalCode: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    notes: '',
    urgency: 'medium'
  });

  const canadianProvinces = [
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia',
    'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec',
    'Saskatchewan', 'Yukon'
  ];

  useEffect(() => {
    fetchClinicData();
  }, []);

  useEffect(() => {
    if (selectedDate) fetchAvailableSlots(selectedDate);
  }, [selectedDate]);

  const formatDateDisplay = (dateString) => {
    if (!dateString) return '';
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      const dateObj = new Date(year, month - 1, day);
      return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    }
    return dateString;
  };

  const fetchClinicData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/appointments');
      const data = await response.json();
      if (data.success) {
        setAvailableDates(data.availableDates || []);
      } else {
        setError(data.message || 'Failed to load clinic information');
      }
    } catch (error) {
      setError('Failed to load clinic information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableSlots = async (date) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/appointments?date=${date}`);
      const data = await response.json();
      if (data.success) {
        setAvailableSlots(data.slots);
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, appointmentDate: date }));
    setSelectedTime('');
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setFormData(prev => ({ ...prev, appointmentTime: time }));
    setStep(3);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHealthcareProvinceChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, healthcareProvince: value }));
    if (value !== 'Other') setOtherProvince('');
  };

  const handleOtherProvinceChange = (e) => {
    const value = e.target.value;
    setOtherProvince(value);
    setFormData(prev => ({ ...prev, healthcareProvince: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const finalFormData = {
      ...formData,
      healthcareProvince: formData.healthcareProvince === 'Other' ? otherProvince : formData.healthcareProvince,
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalFormData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Appointment booked successfully!');
        setStep(4);
        setFormData({
          firstName: '', lastName: '', email: '', gender: '', healthcareProvince: '',
          healthcareNumber: '', dateOfBirth: '', cellPhone: '', address: '',
          country: 'Canada', postalCode: '', appointmentDate: '', appointmentTime: '',
          reason: '', notes: '', urgency: 'medium'
        });
        setOtherProvince('');
        setSelectedDate('');
        setSelectedTime('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedDate('');
    setSelectedTime('');
    setOtherProvince('');
    setError('');
    setSuccess('');
    fetchClinicData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Minimal */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-30-100 px-4 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-cyan-30-600 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">Secure Online Booking</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-700 mb-3 tracking-tight">
            Book Your Visit
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Schedule in minutes. Simple. Secure. Convenient.
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 1 ? 'bg-cyan-800 text-white' : 'bg-cyan-30-200 text-gray-500'}`}>
              1
            </div>
            <div className={`w-16 sm:w-24 h-px ${step >= 2 ? 'bg-cyan-30-800' : 'bg-cyan-30-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 2 ? 'bg-cyan-800 text-white' : 'bg-cyan-30-200 text-gray-500'}`}>
              2
            </div>
            <div className={`w-16 sm:w-24 h-px ${step >= 3 ? 'bg-cyan-30-800' : 'bg-cyan-30-200'}`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${step >= 3 ? 'bg-cyan-800 text-white' : 'bg-cyan-30-200 text-gray-500'}`}>
              3
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-2 text-xs text-gray-500">
          <span className="w-16 sm:w-24 text-center">Date</span>
          <span className="w-16 sm:w-24 text-center">Time</span>
          <span className="w-16 sm:w-24 text-center">Details</span>
        </div>
      </div>

      {/* Step 1: Date Selection */}
      {step === 1 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500 text-sm">Loading available dates...</p>
                </div>
              ) : availableDates.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {availableDates.map((dateInfo) => (
                    <button
                      key={dateInfo.date}
                      onClick={() => handleDateSelect(dateInfo.date)}
                      onMouseEnter={() => setHoveredDate(dateInfo.date)}
                      onMouseLeave={() => setHoveredDate(null)}
                      className={`group relative p-4 rounded-xl text-center transition-all duration-200 ${
                        selectedDate === dateInfo.date
                          ? 'bg-cyan-30-800 text-white shadow-lg scale-[1.02]'
                          : hoveredDate === dateInfo.date
                          ? 'bg-cyan-30-100 border border-gray-200'
                          : 'bg-white border border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl font-light">
                        {new Date(dateInfo.date).getDate()}
                      </div>
                      <div className={`text-sm mt-1 ${selectedDate === dateInfo.date ? 'text-gray-300' : 'text-gray-500'}`}>
                        {new Date(dateInfo.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short' })}
                      </div>
                      {dateInfo.isToday && (
                        <span className={`absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded-full ${
                          selectedDate === dateInfo.date ? 'bg-cyan-30-600 text-white' : 'bg-cyan-30-200 text-gray-600'
                        }`}>
                          Today
                        </span>
                      )}
                      <div className={`mt-3 pt-2 text-xs ${selectedDate === dateInfo.date ? 'text-gray-400' : 'text-gray-400'}`}>
                        {dateInfo.availableSlots || 0} slots
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No available dates</p>
                  <p className="text-gray-400 text-sm mt-1">Please check back later</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Time Selection */}
      {step === 2 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-500">Selected Date</p>
                  <p className="font-medium text-gray-700">{selectedDate && formatDateDisplay(selectedDate)}</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                  ← Change
                </button>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-10 h-10 border-2 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500 text-sm">Loading time slots...</p>
                </div>
              ) : availableSlots.length > 0 ? (
                <>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`
                          py-3 rounded-xl text-center font-medium transition-all duration-200
                          ${selectedTime === slot.time
                            ? 'bg-cyan-30-800 text-white shadow-md'
                            : slot.available
                            ? 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-cyan-30'
                            : 'bg-cyan-30 border border-gray-100 text-gray-400 cursor-not-allowed line-through'
                          }
                        `}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  {selectedTime && (
                    <div className="mt-8 pt-4 flex justify-end">
                      <button
                        onClick={() => setStep(3)}
                        className="px-6 py-2.5 bg-cyan-30-800 text-white rounded-lg hover:bg-cyan-30-900 transition-colors font-medium text-sm"
                      >
                        Continue
                        <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">No available time slots</p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 text-gray-500 hover:text-gray-800 font-medium text-sm"
                  >
                    ← Choose another date
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Personal Details */}
      {step === 3 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Appointment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-cyan-30 border border-gray-200 rounded-2xl p-5 sticky top-6">
                <h3 className="font-medium text-gray-700 mb-4">Appointment Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-700">{selectedDate && formatDateDisplay(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-gray-700">{selectedTime}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-gray-500 text-xs">Location</p>
                    <p className="text-gray-700 text-sm mt-1">Trim Medical Centre<br />1280 Trim Rd, Unit B, Orleans, ON</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-700 mb-1">Your Information</h2>
                  <p className="text-sm text-gray-500 mb-6">Please fill out all required fields</p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                          placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                          placeholder="Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                          placeholder="john@example.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                        <input type="tel" name="cellPhone" value={formData.cellPhone} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                          placeholder="(123) 456-7890" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required
                          max={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                        <select name="gender" value={formData.gender} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700">
                          <option value="">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                          placeholder="123 Main Street" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code *</label>
                        <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                          placeholder="A1B 2C3" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Healthcare Number *</label>
                        <input type="text" name="healthcareNumber" value={formData.healthcareNumber} onChange={handleInputChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                          placeholder="123456789" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Healthcare Province *</label>
                        <select name="healthcareProvince" value={formData.healthcareProvince} onChange={handleHealthcareProvinceChange} required
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700">
                          <option value="">Select Province</option>
                          {canadianProvinces.map(province => (
                            <option key={province} value={province}>{province}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      {formData.healthcareProvince === 'Other' && (
                        <div className="sm:col-span-2">
                          <input type="text" value={otherProvince} onChange={handleOtherProvinceChange} required
                            className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700"
                            placeholder="Please specify your province" />
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment *</label>
                        <textarea name="reason" value={formData.reason} onChange={handleInputChange} required rows={3}
                          className="w-full px-4 py-2.5 bg-cyan-30 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 transition-all text-gray-700 resize-none"
                          placeholder="Please describe the reason for your visit..." />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                      <button type="button" onClick={resetForm}
                        className="px-6 py-2.5 text-gray-600 bg-cyan-30-100 rounded-lg hover:bg-cyan-30-200 transition-colors font-medium text-sm">
                        Cancel
                      </button>
                      <button type="submit" disabled={loading}
                        className=" bg-cyan-600 px-8 py-2.5 bg-cyan-30-800 text-white rounded-lg hover:bg-cyan-30-900 transition-all font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <div className=" bg-cyan-600 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          'Confirm Booking'
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-cyan-30-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-light text-gray-700 mb-2">Appointment Confirmed</h2>
              <p className="text-gray-500 text-sm mb-6">A confirmation has been sent to your email</p>
              
              <div className="bg-cyan-30 rounded-xl p-5 text-left mb-6">
                <h3 className="font-medium text-gray-700 mb-3">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date & Time</span>
                    <span className="text-gray-700">{selectedDate && formatDateDisplay(selectedDate)} at {selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Patient</span>
                    <span className="text-gray-700">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location</span>
                    <span className="text-gray-700">1280 Trim Rd, Unit B, Orleans</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-30 rounded-xl p-4 mb-6 text-left">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">What to bring:</p>
                    <ul className="space-y-0.5 text-gray-600 text-xs">
                      <li>• Valid health card</li>
                      <li>• Photo ID</li>
                      <li>• List of current medications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button onClick={resetForm}
                className="px-6 py-2.5 bg-cyan-30-800 text-white rounded-lg hover:bg-cyan-30-900 transition-all font-medium text-sm">
                Book Another Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && step !== 4 && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 -mt-8">
          <div className="bg-cyan-30-100 border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-30-200 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}