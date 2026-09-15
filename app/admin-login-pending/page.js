"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function AdminLoginPendingContent() {
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          {/* Clinic Logo */}
          <div className="flex items-center justify-center mx-auto mb-6">
            <img 
              src="/TrimLOGO11.svg" 
              alt="Trim Medical Centre Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Check Your Email
          </h1>

          <p className="text-gray-500 mb-4">
            A confirmation link has been sent to
          </p>

          {email && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 mb-5 inline-block">
              <p className="text-gray-800 font-semibold text-sm break-all">{email}</p>
            </div>
          )}

          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Click the link in your email to complete your admin login. The link
            will expire in <strong className="text-gray-700">15 minutes</strong>.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <p className="text-amber-800 text-sm text-left">
                Don&apos;t see the email? Check your spam folder or try logging
                in again.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {resent && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
              A new confirmation email has been sent!
            </div>
          )}

          <div className="space-y-3">
            <Link
              href="/login"
              className="block w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors text-center font-medium"
            >
              Back to Login
            </Link>

            <Link
              href="/"
              className="block text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPending() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              <div className="flex items-center justify-center mx-auto mb-6">
                <img 
                  src="/TrimLOGO11.svg" 
                  alt="Trim Medical Centre Logo" 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">
                Loading...
              </h1>
            </div>
          </div>
        </div>
      }
    >
      <AdminLoginPendingContent />
    </Suspense>
  );
}
