'use client'

import Link from 'next/link'

export default function SignupConfirmationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-gray-800 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Check your email
        </h2>
        
        <div className="text-gray-400">
          <p className="mb-4">
            We've sent a confirmation link to your email address.
          </p>
          <p className="mb-6">
            Please check your inbox (and spam folder) to verify your account.
          </p>
          
          <div className="mt-8 rounded-md bg-gray-700 p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold">Didn't receive an email?</span> Check your spam folder or try again in a few minutes.
            </p>
          </div>
        </div>
        
        <div className="pt-4">
          <Link href="/login" className="text-sm font-medium text-indigo-400 hover:text-indigo-300">
            Return to login page
          </Link>
        </div>
      </div>
    </div>
  )
}