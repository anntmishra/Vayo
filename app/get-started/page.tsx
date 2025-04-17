'use client';

import Link from 'next/link';

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header/Navigation */}
      <header className="bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-indigo-600">Vayo</Link>
              </div>
              <nav className="ml-6 flex items-center space-x-8">
                <Link href="/" className="text-indigo-900 hover:text-indigo-600 transition-colors">Home</Link>
                <Link href="/about" className="text-indigo-900 hover:text-indigo-600 transition-colors">About</Link>
                <Link href="/solutions" className="text-indigo-900 hover:text-indigo-600 transition-colors">Solutions</Link>
                <Link href="/contact" className="text-indigo-900 hover:text-indigo-600 transition-colors">Contact</Link>
              </nav>
            </div>
            <div className="flex items-center">
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 transition-colors mr-4">Login</Link>
              <Link href="/demo" className="text-purple-600 hover:text-purple-800 transition-colors mr-4">Try Demo</Link>
              <Link href="/create-account" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Get Started with Vayo
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              Begin your journey to more efficient fleet management today.
            </p>
            <div className="mt-8">
              <Link href="/demo" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 shadow-md transition-all">
                Try Our Interactive Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-3xl font-bold text-indigo-900">Create Your Account</h2>
                <p className="mt-2 text-lg text-indigo-700">
                  Set up your Vayo account to access our full suite of telematics solutions.
                </p>
                <div className="mt-6">
                  <Link href="/create-account" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-3xl font-bold text-indigo-900">Configure Your Fleet</h2>
                <p className="mt-2 text-lg text-indigo-700">
                  Add your vehicles and customize tracking parameters to match your needs.
                </p>
                <div className="mt-6">
                  <Link href="#" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors">
                    Configure Fleet
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
              </div>
              <div className="ml-6">
                <h2 className="text-3xl font-bold text-indigo-900">Start Monitoring</h2>
                <p className="mt-2 text-lg text-indigo-700">
                  Access real-time data and insights about your fleet's performance.
                </p>
                <div className="mt-6">
                  <Link href="/dashboard" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors">
                    View Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl">
                  <span className="block">Need Help?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-700">
                  Our support team is available 24/7 to help you get started with Vayo.
                </p>
                <div className="mt-8">
                  <div className="inline-flex rounded-md shadow">
                    <Link href="/contact" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold">Vayo</h3>
              <p className="mt-2 text-indigo-200">
                Modern solutions for modern fleets.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Solutions</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Fleet Management</Link></li>
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Driver Safety</Link></li>
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/about" className="text-indigo-200 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-indigo-200 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-indigo-200 hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="#" className="text-indigo-200 hover:text-white transition-colors">Twitter</Link></li>
                <li><Link href="#" className="text-indigo-200 hover:text-white transition-colors">LinkedIn</Link></li>
                <li><Link href="#" className="text-indigo-200 hover:text-white transition-colors">Facebook</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-indigo-800 pt-8">
            <p className="text-indigo-300 text-center">© 2023 Vayo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 