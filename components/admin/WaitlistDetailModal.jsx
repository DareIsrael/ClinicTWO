'use client';
import WaitlistStatusDropdown from './WaitlistStatusDropdown';


import { X, User, MapPin, Shield, Clipboard } from 'lucide-react';
// import WaitlistStatusDropdown from './WaitlistStatusDropdown';

const WaitlistDetailModal = ({ entry, onClose, onStatusChange }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Light translucent overlay matching original design */}
      <div 
        className="absolute inset-0 bg-white/75 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      ></div>
      
      {/* A4 sheet modal container */}
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl border border-slate-200 flex flex-col z-10">
        {/* Letterhead Header Section */}
        <div className="bg-[#0891b2] text-white p-6 md:p-8 relative border-b border-[#0891b2]">
          
          {/* Top row: Hospital Logo + Clinic name & Close button */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-lg shadow-md flex items-center justify-center">
                <img 
                  src="/TrimLOGO11.svg" 
                  alt="Trim Medical Centre Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-widest text-blue-100 uppercase">
                  Trim Medical Centre
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-blue-200 font-semibold">
                  Patient Waitlist Record
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition duration-200 p-1.5 hover:bg-white/10 rounded-full focus:outline-none"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom row: Patient name and status badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t border-white/10 pt-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                {entry.firstName} {entry.lastName}
              </h2>
              <p className="text-xs text-blue-200 mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>DOB: {entry.dateOfBirth ? new Date(entry.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                <span className="hidden sm:inline text-blue-300">•</span>
                <span>Gender: {entry.gender || 'N/A'}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <span className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Status:</span>
              <WaitlistStatusDropdown 
                waitlistEntry={entry} 
                onStatusChange={onStatusChange}
              />
            </div>
          </div>
        </div>

        {/* Modal Body: A4 Content Sheets */}
        <div className="p-6 md:p-8 bg-slate-50/50 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Personal Profile */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                <div className="bg-blue-50 p-1.5 rounded text-blue-800">
                  <User className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Personal Information
                </h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    First Name
                  </label>
                  <p className="text-sm font-semibold text-slate-700">{entry.firstName}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Last Name
                  </label>
                  <p className="text-sm font-semibold text-slate-700">{entry.lastName}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Email Address
                  </label>
                  <p className="text-sm font-semibold text-slate-700 select-all">{entry.email}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Cell Phone
                  </label>
                  <p className="text-sm font-semibold text-slate-700 select-all">{entry.cellPhone || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Gender
                  </label>
                  <p className="text-sm font-semibold text-slate-700">{entry.gender || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Healthcare */}
            <div className="space-y-6">
              
              {/* Contact Card */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <div className="bg-blue-50 p-1.5 rounded text-blue-800">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Contact & Address
                  </h4>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Street Address
                    </label>
                    <p className="text-sm font-semibold text-slate-700">{entry.address || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Country
                      </label>
                      <p className="text-sm font-semibold text-slate-700">{entry.country || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Postal Code
                      </label>
                      <p className="text-sm font-semibold text-slate-700 uppercase">{entry.postalCode || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Healthcare Card */}
              <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <div className="bg-blue-50 p-1.5 rounded text-blue-800">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Healthcare Coverage
                  </h4>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Healthcare Number
                    </label>
                    <p className="text-sm font-semibold text-slate-700 select-all">{entry.healthcareNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Province
                    </label>
                    <p className="text-sm font-semibold text-slate-700">{entry.healthcareProvince || 'N/A'}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Card: Waitlist Registration details */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-5 mt-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
              <div className="bg-blue-50 p-1.5 rounded text-blue-800">
                <Clipboard className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Registration details
              </h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Waitlist Joined Date
                </label>
                <p className="text-sm font-semibold text-slate-700">
                  {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Record ID
                </label>
                <p className="text-sm font-mono text-slate-500">{entry._id}</p>
              </div>
            </div>
          </div>

          {/* Medical Record Watermark Footer */}
          <div className="mt-8 pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            <div>Trim Medical Centre • Confidential Patient Record</div>
            <div>Page 1 of 1</div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex justify-end gap-3 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition duration-200 shadow-sm"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistDetailModal;