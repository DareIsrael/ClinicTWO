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
    return pathname === path ? 'text-red-400 bg-red-50 font-semibold' : 'text-gray-700 hover:text-red-400 hover:bg-gray-50';
  };

  // Don't show navbar while checking auth status
  if (loading) {
    return (
      <nav className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center justify-start">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/TrimLOGO1.svg"
                  alt="Trim Medical Centre Logo"
                  width={100}
                  height={40}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header - Always visible */}
        <div className="md:hidden py-3 border-b border-gray-100">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src="/TrimLOGO1.svg"
                alt="Trim Medical Centre Logo"
                width={100}
                height={40}
                className="object-contain"
                priority
              />
            </Link>
            
            {/* Mobile Contact Info */}
            <div className="text-right">
              <div className="flex items-center justify-end space-x-1 mb-1">
                <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:3438873470" 
                  className="text-xs font-semibold text-red-400 hover:text-red-400 transition-colors"
                >
                  (343) 224-4070
                </a>
              </div>
              <div className="text-xs text-gray-600 leading-tight">
                158 Rideau St, Ottawa
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex justify-between items-center h-16">
          {/* Desktop Logo */}
          <div className="hidden md:flex items-center">
            <Link href="/" className="flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src="/TrimLOGO1.svg"
                alt="Trim Medical Centre Logo"
                width={100}
                height={50}
                className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Clinic Information - Desktop */}
          <div className="hidden lg:flex items-center space-x-4 mx-4">
            <div className="text-center">
              <div className="flex flex-col items-start">
                <div className="flex items-center space-x-2 text-gray-800">
                  <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-sm text-gray-900 leading-tight whitespace-nowrap">
                    1280 Trim Rd, Unit B, Orleans, ON K4A 3N3
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-6 w-px bg-gray-200"></div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <svg className="w-3.5 h-3.5 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href="tel:3432244070" 
                  className="text-sm font-semibold text-red-400 hover:text-red-400 transition-colors whitespace-nowrap"
                >
                  (343) 224-4070
                </a>
              </div>
              <div className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                Call for appointments
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/')} whitespace-nowrap`}
            >
              Home
            </Link>

            {/* Online Booking Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOnlineBookingDropdownOpen(!isOnlineBookingDropdownOpen)}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-400 text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-1.5 whitespace-nowrap"
              >
                <span>Book Now</span>
                <svg 
                  className={`w-3 h-3 transition-transform duration-200 ${isOnlineBookingDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              {isOnlineBookingDropdownOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-200">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Book Appointment</div>
                    <div className="text-xs text-gray-600 mt-0.5">Select your appointment type</div>
                  </div>
                  
                  <Link
                    href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
                    className="flex items-center space-x-2 px-3 py-2.5 hover:bg-gray-50 transition-all duration-200 group"
                    onClick={() => setIsOnlineBookingDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">For Rostered Patients Only</div>
                      <div className="text-xs text-gray-500 mt-0.5">For existing patients</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <Link
                    href="/book-appointment"
                    className="flex items-center space-x-2 px-3 py-2.5 hover:bg-gray-50 transition-all duration-200 group"
                    onClick={() => setIsOnlineBookingDropdownOpen(false)}
                  >
                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">Walk-In Care</div>
                      <div className="text-xs text-gray-500 mt-0.5">For walk-in patients</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/about')} whitespace-nowrap`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActiveLink('/contact')} whitespace-nowrap`}
            >
              Contact
            </Link>

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
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-red-400 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:bg-gray-50">
                    <div className="w-7 h-7 bg-red-400 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm">
                      {user?.firstName?.charAt(0)}
                    </div>
                    <svg className="w-2.5 h-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-gray-100">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="text-xs font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:text-red-400"
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
            ) : (
              <div className="flex items-center space-x-2 ml-2">
                <Link 
                  href="/waitlist" 
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-red-400 text-white hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  Join Waitlist
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button - Only shows on mobile */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Contact Info - Additional for consistency */}
            <div className="hidden sm:block text-right">
              <a 
                href="tel:3438873470" 
                className="text-xs font-semibold text-red-400 hover:text-red-400 transition-colors whitespace-nowrap"
              >
                (343) 224-4070
              </a>
            </div>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-red-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 transition-all duration-200"
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

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 animate-fadeIn z-50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              
              <Link
                href="/about"
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/about')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>About</span>
              </Link>
              
              <Link
                href="/contact"
                className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/contact')}`}
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Contact</span>
              </Link>

              {/* Online Booking Dropdown for Mobile */}
              <div className="px-1 pt-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">Online Booking</div>
                
                <Link
                  href="https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554"
                  className="flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium bg-red-50 text-red-400 hover:bg-red-100 transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Registered Patients</span>
                </Link>
                
                <Link
                  href="/book-appointment"
                  className="flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium bg-red-50 text-red-400 hover:bg-red-100 transition-all duration-200 mt-1"
                  onClick={closeMobileMenu}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Walk-In Care</span>
                </Link>
              </div>
              
              {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className={`flex items-center space-x-2 px-3 py-2.5 rounded-lg mx-1 text-sm font-medium transition-all duration-200 ${isActiveLink('/admin')}`}
                      onClick={closeMobileMenu}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Admin</span>
                    </Link>
                  )}
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <div className="px-3 py-2">
                      <div className="text-xs font-medium text-gray-900 truncate">{user?.firstName} {user?.lastName}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full text-left px-3 py-2.5 rounded-lg mx-1 text-sm font-medium text-gray-700 hover:text-red-400 hover:bg-gray-50 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign out</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/waitlist"
                    className="flex items-center space-x-2 mx-1 px-3 py-2.5 rounded-lg text-sm font-semibold bg-red-400 text-white hover:bg-red-700 transition-all duration-200 shadow-sm"
                    onClick={closeMobileMenu}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-5.197a6 6 0 00-9 5.197" />
                    </svg>
                    <span>Join Waitlist</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}


// 'use client';
// import Link from 'next/link';
// import Image from 'next/image';
// import { useState, useRef, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/hooks/useAuth';

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isOnlineBookingDropdownOpen, setIsOnlineBookingDropdownOpen] = useState(false);
//   const pathname = usePathname();
//   const { user, isAuthenticated, signOut, loading } = useAuth();
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOnlineBookingDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     signOut();
//     setIsMenuOpen(false);
//   };

//   const closeMobileMenu = () => {
//     setIsMenuOpen(false);
//     setIsOnlineBookingDropdownOpen(false);
//   };

//   const isActiveLink = (path) =>
//     pathname === path
//       ? 'text-red-400 bg-red-50 font-semibold'
//       : 'text-gray-700 hover:text-red-400 hover:bg-gray-50';

//   if (loading) {
//     return (
//       <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex justify-between items-center h-16">
//             <Image src="/TrimLOGO1.svg" alt="Logo" width={100} height={40} />
//             <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
//           </div>
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full overflow-x-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* MOBILE HEADER */}
//         <div className="md:hidden py-3 border-b border-gray-100">
//           <div className="flex justify-between items-center">
//             <Link href="/" onClick={closeMobileMenu}>
//               <Image
//                 src="/TrimLOGO1.svg"
//                 alt="Logo"
//                 width={100}
//                 height={40}
//                 priority
//               />
//             </Link>

//             <div className="text-right max-w-[60%]">
//               <a
//                 href="tel:3432244070"
//                 className="text-xs font-semibold text-red-400 break-words"
//               >
//                 (343) 224-4070
//               </a>
//               <p className="text-[10px] text-gray-600 break-words">
//                 158 Rideau St, Ottawa
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* MAIN NAV */}
//         <div className="flex justify-between items-center h-16">

//           {/* LOGO */}
//           <div className="hidden md:flex">
//             <Link href="/">
//               <Image
//                 src="/TrimLOGO1.svg"
//                 alt="Logo"
//                 width={100}
//                 height={50}
//                 priority
//               />
//             </Link>
//           </div>

//           {/* DESKTOP NAV */}
//           <div className="hidden md:flex items-center space-x-1">

//             <Link href="/" className={`px-3 py-2 rounded-lg text-sm ${isActiveLink('/')}`}>
//               Home
//             </Link>

//             {/* DROPDOWN */}
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 onClick={() => setIsOnlineBookingDropdownOpen(!isOnlineBookingDropdownOpen)}
//                 className="px-4 py-2 rounded-lg text-sm font-semibold bg-red-400 text-white"
//               >
//                 Book Now
//               </button>

//               {isOnlineBookingDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border z-50">
//                   <Link
//                     href="/book-appointment"
//                     className="block px-4 py-2 text-sm hover:bg-gray-50"
//                   >
//                     Walk-In Care
//                   </Link>
//                 </div>
//               )}
//             </div>

//             <Link href="/about" className={`px-3 py-2 rounded-lg text-sm ${isActiveLink('/about')}`}>
//               About
//             </Link>

//             <Link href="/contact" className={`px-3 py-2 rounded-lg text-sm ${isActiveLink('/contact')}`}>
//               Contact
//             </Link>

//             {!isAuthenticated && (
//               <Link
//                 href="/waitlist"
//                 className="ml-2 px-3 py-2 rounded-lg text-sm bg-red-400 text-white"
//               >
//                 Join Waitlist
//               </Link>
//             )}
//           </div>

//           {/* MOBILE BUTTON */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-lg"
//             >
//               ☰
//             </button>
//           </div>
//         </div>

//         {/* MOBILE MENU */}
//         {isMenuOpen && (
//           <div className="md:hidden w-full bg-white border-t">
//             <div className="px-4 py-3 space-y-2">

//               <Link href="/" onClick={closeMobileMenu} className="block py-2">
//                 Home
//               </Link>

//               <Link href="/about" onClick={closeMobileMenu} className="block py-2">
//                 About
//               </Link>

//               <Link href="/contact" onClick={closeMobileMenu} className="block py-2">
//                 Contact
//               </Link>

//               <Link
//                 href="/book-appointment"
//                 onClick={closeMobileMenu}
//                 className="block py-2 text-red-400"
//               >
//                 Book Appointment
//               </Link>

//               {!isAuthenticated && (
//                 <Link
//                   href="/waitlist"
//                   onClick={closeMobileMenu}
//                   className="block py-2 bg-red-400 text-white text-center rounded-lg"
//                 >
//                   Join Waitlist
//                 </Link>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }