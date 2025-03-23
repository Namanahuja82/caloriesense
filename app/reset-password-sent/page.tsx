'use client';
import Link from 'next/link';

export default function ResetPasswordSent() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="text-green-400 mb-6">
          <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Check Your Email</h2>
        <p className="text-gray-400 mb-8">
          We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.
        </p>
        
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 shadow-lg mb-6">
          <h3 className="text-xl font-medium text-white mb-4">Didn't receive an email?</h3>
          <p className="text-gray-400 mb-6">
            Check your spam folder or try again in a few minutes. The link may take some time to arrive.
          </p>
          
          <Link href="/login" className="inline-flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}