'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOnlineBookingDropdownOpen, setIsOnlineBookingDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, signOut, loading } = useAuth();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOnlineBookingDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    signOut();
    setIsMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setIsOnlineBookingDropdownOpen(false);
  };

  const isActiveLink = (path) => {
    return pathname === path ? 'text-cyan-600 font-semibold' : 'text-gray-700 hover:text-cyan-600';
  };

  // Don't show navbar while checking auth status
  if (loading) {
    return (
      <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/TrimLOGO11.svg"
                  alt="Trim Medical Centre Logo"
                  width={110}
                  height={44}
                  className="object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Top Bar - cyan background with contact info */}
      <div className="bg-cyan-600 text-white text-sm py-3 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium">1280 Trim Rd, Unit B, Orleans, ON K4A 3N3</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:3432244070" className="text-sm sm:text-base font-semibold hover:text-gray-100 transition-colors whitespace-nowrap">
                (343) 224-4070
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs sm:text-sm break-all text-center sm:text-left">contact@trimmedicalcenter.ca</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Mobile Header */}
        <div className="md:hidden py-3">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src="/TrimLOGO11.svg"
                alt="Trim Medical Centre Logo"
                width={100}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 transition-all duration-200"
              aria-label="Menu"
            >
              <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="hidden md:flex justify-between items-center h-16">
          {/* Desktop Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src="/TrimLOGO11.svg"
                alt="Trim Medical Centre Logo"
                width={120}
                height={48}
                className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - with reduced gap */}
          <div className="flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/')} whitespace-nowrap`}
            >
              Home
            </Link>

            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/about')} whitespace-nowrap`}
            >
              About
            </Link>

            <Link 
              href="/uninsured-services" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/uninsured-services')} whitespace-nowrap`}
            >
              Uninsured Services
            </Link>

            <Link 
              href="/policies" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/policies')} whitespace-nowrap`}
            >
              Policy
            </Link>

            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/contact')} whitespace-nowrap`}
            >
              Contact
            </Link>

            {/* Online Booking Dropdown */}
            <div className="relative" ref={dropdownRef}>
              
              
              {/* Dropdown Menu */}
              {isOnlineBookingDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Book Appointment</div>
                    <div className="text-xs text-gray-600 mt-0.5">Select your appointment type</div>
                  </div>
                  
                  <Link
                    href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
                    className="flex items-center space-x-2 px-3 py-2.5 hover:bg-cyan-50 transition-all duration-200 group"
                    onClick={() => setIsOnlineBookingDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700">For Rostered Patients Only</div>
                      <div className="text-xs text-gray-500 mt-0.5">For existing patients</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <Link
                    href="/book-appointment"
                    className="flex items-center space-x-2 px-3 py-2.5 hover:bg-cyan-50 transition-all duration-200 group"
                    onClick={() => setIsOnlineBookingDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-cyan-50 rounded-lg flex items-center justify-center group-hover:bg-cyan-100 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-700 truncate">Walk-In Care</div>
                      <div className="text-xs text-gray-500 mt-0.5">For walk-in patients</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            {isAuthenticated ? (
              <>
                {user?.role === 'admin' && (
                  <Link 
                    href="/admin" 
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/admin')} whitespace-nowrap`}
                  >
                    Admin
                  </Link>
                )}
                
                <div className="relative group ml-1">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-cyan-600 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-cyan-50">
                    <div className="w-7 h-7 bg-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                      {user?.firstName?.charAt(0)}
                    </div>
                    <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="text-xs font-medium text-gray-700 truncate">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-cyan-50 transition-all duration-200 hover:text-cyan-600"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Sign out</span>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Mobile Navigation Menu - Fixed Icons */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-fadeIn z-50">
            <div className="px-3 pt-3 pb-4 space-y-1">
              {/* Home */}
              <Link
                href="/"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActiveLink('/')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              
              {/* About */}
              <Link
                href="/about"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActiveLink('/about')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About</span>
              </Link>
              
              {/* Uninsured Services */}
              <Link
                href="/uninsured-services"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActiveLink('/uninsured-services')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Uninsured Services</span>
              </Link>

              {/* Policies */}
              <Link
                href="/policies"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActiveLink('/policies')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Policy</span>
              </Link>

              {/* Contact */}
              <Link
                href="/contact"
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActiveLink('/contact')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact</span>
              </Link>

              {/* Online Booking for Mobile */}
              <div className="pt-3 pb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Book Online</p>
                
                <Link
                  href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg mx-1 text-base font-medium bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition-all duration-200 mb-2"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Registered Patients</span>
                </Link>
                
                <Link
                  href="/book-appointment"
                  className="flex items-center space-x-3 px-3 py-3 rounded-lg mx-1 text-base font-medium bg-cyan-50 text-cyan-600 hover:bg-cyan-100 transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Walk-In Care</span>
                </Link>
              </div>
              
              {isAuthenticated && (
                <>
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${isActiveLink('/admin')}`}
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Admin Dashboard</span>
                    </Link>
                  )}
                  
                  <div className="border-t border-gray-100 mt-3 pt-3">
                    <div className="px-3 py-2">
                      <div className="text-sm font-medium text-gray-700 truncate">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full text-left px-3 py-3 rounded-lg mx-1 text-base font-medium text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-all duration-200 mt-1"
                    >
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}