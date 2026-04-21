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

  // Get current date for display
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Wave - No Red Background */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-primary-light shadow-sm px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gray-700 uppercase  text-primary tracking-wider">Secure Online Booking</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Book Your Visit
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Schedule an appointment in minutes. Choose a date and time that works best for you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 -mt-8">
        {/* Step 1: Date Selection */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                <div>
                  <h2 className="font-semibold text-gray-900">Select Date</h2>
                  <p className="text-xs text-gray-500">Choose when you'd like to visit</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500">Loading available dates...</p>
                </div>
              ) : availableDates.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableDates.map((dateInfo) => (
                    <button
                      key={dateInfo.date}
                      onClick={() => handleDateSelect(dateInfo.date)}
                      className={`group relative p-5 rounded-xl text-left transition-all duration-300 ${
                        selectedDate === dateInfo.date
                          ? 'bg-red-400 text-white shadow-lg'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`text-lg font-bold ${selectedDate === dateInfo.date ? 'text-white' : 'text-gray-900'}`}>
                            {new Date(dateInfo.date).getDate()}
                          </div>
                          <div className={`text-sm ${selectedDate === dateInfo.date ? 'text-white/80' : 'text-gray-500'}`}>
                            {new Date(dateInfo.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short' })}
                          </div>
                        </div>
                        {dateInfo.isToday && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedDate === dateInfo.date ? 'bg-white/20 text-white' : 'bg-red-100 text-red-400'
                          }`}>
                            Today
                          </span>
                        )}
                      </div>
                      <div className={`mt-4 pt-4 border-t flex items-center justify-between text-sm ${
                        selectedDate === dateInfo.date ? 'border-white/20' : 'border-gray-200'
                      }`}>
                        <span className={selectedDate === dateInfo.date ? 'text-white/70' : 'text-gray-500'}>Slots</span>
                        <span className={`font-semibold ${selectedDate === dateInfo.date ? 'text-white' : 'text-red-400'}`}>
                          {dateInfo.availableSlots || 0} available
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">No available dates</p>
                  <p className="text-gray-400 text-sm mt-1">Please check back later</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Time Selection */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Select Time</h2>
                    <p className="text-xs text-gray-500">{selectedDate && formatDateDisplay(selectedDate)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-red-400 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Change Date
                </button>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                  <p className="mt-4 text-gray-500">Loading time slots...</p>
                </div>
              ) : availableSlots.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleTimeSelect(slot.time)}
                        disabled={!slot.available}
                        className={`
                          py-4 rounded-xl text-center font-medium transition-all duration-200
                          ${selectedTime === slot.time
                            ? 'bg-red-400 text-white shadow-md scale-105'
                            : slot.available
                            ? 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-100'
                            : 'bg-gray-50 text-gray-400 cursor-not-allowed line-through'
                          }
                        `}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  {selectedTime && (
                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={() => setStep(3)}
                        className="px-6 py-3 bg-red-400 text-white rounded-xl hover:bg-red-700 transition-all font-medium flex items-center gap-2 shadow-sm"
                      >
                        Continue to Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">No available time slots</p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-4 text-red-400 hover:text-red-400 font-medium"
                  >
                    ← Choose another date
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Personal Details - Split Layout */}
        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side - Appointment Summary Card */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-2xl p-6 text-white sticky top-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white/70 text-sm">Your Appointment</h3>
                    <p className="text-white text-sm opacity-90">Review your selection</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b border-white/20 pb-4">
                    <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Date</p>
                    <p className="text-white font-medium">{selectedDate && formatDateDisplay(selectedDate)}</p>
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Time</p>
                    <p className="text-white font-medium">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-white/70 text-xs uppercase tracking-wide mb-1">Location</p>
                    <p className="text-white text-sm">Trim Medical Centre<br />1280 Trim Rd, Unit B, Orleans, ON K4A 3N3</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 text-white/60 text-xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure & Confidential</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <h2 className="font-semibold text-gray-900">Your Details</h2>
                      <p className="text-xs text-gray-500">Fill in your information below</p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                        placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                        placeholder="Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                        placeholder="john@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <input type="tel" name="cellPhone" value={formData.cellPhone} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                        placeholder="(123) 456-7890" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                      <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                      <select name="gender" value={formData.gender} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all">
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                      <input type="text" name="address" value={formData.address} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                        placeholder="123 Main Street" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code *</label>
                      <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                        placeholder="A1B 2C3" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Number *</label>
                      <input type="text" name="healthcareNumber" value={formData.healthcareNumber} onChange={handleInputChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                        placeholder="123456789" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare Province *</label>
                      <select name="healthcareProvince" value={formData.healthcareProvince} onChange={handleHealthcareProvinceChange} required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all">
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
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all"
                          placeholder="Please specify your province" />
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Appointment *</label>
                      <textarea name="reason" value={formData.reason} onChange={handleInputChange} required rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 focus:bg-white transition-all resize-none"
                        placeholder="Please describe the reason for your visit..." />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
                    <button type="button" onClick={resetForm}
                      className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                      Cancel
                    </button>
                    <button type="submit" disabled={loading}
                      className="px-8 py-3 bg-red-400 text-white rounded-xl hover:bg-red-700 transition-all font-medium shadow-sm disabled:opacity-50 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation - Celebration Card */}
        {step === 4 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="relative bg-gray-800 px-6 py-8 text-center">
              <div className="relative">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Appointment Confirmed!</h2>
                <p className="text-white/70">A confirmation has been sent to your email</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Appointment Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Date & Time</p>
                    <p className="font-medium text-gray-900 mt-1">{selectedDate && formatDateDisplay(selectedDate)} at {selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Patient</p>
                    <p className="font-medium text-gray-900 mt-1">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Location</p>
                    <p className="font-medium text-gray-900 mt-1">1280 Trim Rd, Unit B, Orleans, ON K4A 3N3</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Contact</p>
                    <p className="font-medium text-gray-900 mt-1">{formData.email} | {formData.cellPhone}</p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-gray-700">
                    <p className="font-medium mb-1">What to bring:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Valid health card</li>
                      <li>• Photo ID</li>
                      <li>• List of current medications (if any)</li>
                      <li>• Any relevant medical records</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button onClick={resetForm}
                className="w-full py-3 bg-red-400 text-white rounded-xl hover:bg-red-700 transition-all font-medium shadow-sm">
                Book Another Appointment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Error Message Display */}
      {error && step !== 4 && (
        <div className="max-w-5xl mx-auto px-6 -mt-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}