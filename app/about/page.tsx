'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header/Navigation */}
      <header className="py-4 border-b border-indigo-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Vayo</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-indigo-900 hover:text-indigo-600 transition-colors">Home</Link>
            <Link href="/about" className="text-indigo-600 font-medium">About</Link>
            <Link href="/solutions" className="text-indigo-900 hover:text-indigo-600 transition-colors">Solutions</Link>
            <Link href="/contact" className="text-indigo-900 hover:text-indigo-600 transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Login
            </Link>
            <Link href="/get-started" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              About Vayo
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              Transforming fleet management with cutting-edge technology and data-driven insights.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-4 text-lg text-indigo-700">
              Vayo was founded in 2020 with a simple mission: to revolutionize the way fleets are managed. What started as a small team of engineers and industry experts has grown into a leading fleet management solution trusted by companies worldwide.
            </p>
            <p className="mt-4 text-lg text-indigo-700">
              We recognized the challenges fleet managers face daily—from optimizing routes and schedules to managing maintenance and ensuring driver safety. Our team set out to create a comprehensive platform that addresses these challenges through cutting-edge technology, real-time analytics, and actionable insights.
            </p>
            <p className="mt-4 text-lg text-indigo-700">
              Today, Vayo serves thousands of vehicles across multiple industries, helping fleet managers reduce costs, improve efficiency, and enhance safety. As we continue to grow, our commitment to innovation and customer success remains at the heart of everything we do.
            </p>
          </div>
          <div className="mt-10 lg:mt-0">
            <img 
              src="/images/about-team.jpg" 
              alt="Vayo team" 
              className="rounded-xl shadow-xl bg-indigo-100 w-full h-auto object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80';
              }}
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-indigo-700">
              These core principles guide our actions and decisions as we work to transform the fleet management industry.
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-indigo-900">Innovation</h3>
              <p className="mt-2 text-indigo-700">
                We continuously push the boundaries of what's possible in fleet management technology, leveraging the latest advances in AI, IoT, and data analytics to deliver superior solutions.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-indigo-900">Customer-Centric</h3>
              <p className="mt-2 text-indigo-700">
                Our customers' success is our success. We listen closely to their needs, provide responsive support, and develop solutions that address real-world challenges faced by fleet operators.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <div className="h-12 w-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md flex items-center justify-center">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="mt-5 text-lg font-medium text-indigo-900">Safety First</h3>
              <p className="mt-2 text-indigo-700">
                We believe that technology should enhance safety. Our solutions prioritize driver safety and vehicle security, helping our customers protect their most valuable assets.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl">
            Our Leadership Team
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-indigo-700">
            Meet the passionate experts driving Vayo's mission to transform fleet management.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 sm:grid-cols-2">
          <div className="text-center">
            <div className="relative">
              <img
                className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg bg-indigo-100"
                src="/images/team-member-1.jpg"
                alt="Anant Mishra"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
                }}
              />
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
            <h3 className="mt-6 text-xl font-medium text-indigo-900">Anant Mishra</h3>
          </div>
          
          <div className="text-center">
            <div className="relative">
              <img
                className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg bg-indigo-100"
                src="/images/team-member-2.jpg"
                alt="Pranav Gupta"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
                }}
              />
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
            <h3 className="mt-6 text-xl font-medium text-indigo-900">Pranav Gupta</h3>
          </div>
          
          <div className="text-center">
            <div className="relative">
              <img
                className="mx-auto h-56 w-56 rounded-full object-cover shadow-lg bg-indigo-100"
                src="/images/team-member-3.jpg"
                alt="Jay Wardhan Suri"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
                }}
              />
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
            <h3 className="mt-6 text-xl font-medium text-indigo-900">Jay Wardhan Suri</h3>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-20 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your fleet?</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Get started with Vayo today and join hundreds of companies already optimizing their fleet operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started" className="bg-white text-indigo-600 hover:bg-indigo-50 py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all inline-block">
                Get Started
              </Link>
              <Link href="/contact" className="bg-indigo-700 text-white hover:bg-indigo-800 py-3 px-8 rounded-lg transition-colors inline-block">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12 mt-auto">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Vayo</h3>
              <p className="text-indigo-200">
                Modern solutions for modern fleets.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-indigo-200 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="text-indigo-200 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/about" className="text-indigo-200 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Fleet Management</Link></li>
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Driver Safety</Link></li>
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li className="text-indigo-200">info@vayo.com</li>
                <li className="text-indigo-200">+1 (555) 123-4567</li>
                <li className="text-indigo-200">Bennett University, Greater Noida</li>
                <li><Link href="/contact" className="text-indigo-200 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center">
            <p className="text-indigo-300">© {new Date().getFullYear()} Vayo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 