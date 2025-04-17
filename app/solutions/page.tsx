'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('fleet');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header/Navigation */}
      <header className="bg-white/80 shadow-sm backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-1 flex items-center justify-center">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-2xl font-bold text-indigo-600">Vayo</Link>
              </div>
              <nav className="mx-auto flex items-center space-x-8">
                <Link href="/" className="text-indigo-900 hover:text-indigo-600 transition-colors">Home</Link>
                <Link href="/about" className="text-indigo-900 hover:text-indigo-600 transition-colors">About</Link>
                <Link href="/solutions" className="text-indigo-600 font-medium">Solutions</Link>
                <Link href="/contact" className="text-indigo-900 hover:text-indigo-600 transition-colors">Contact</Link>
              </nav>
            </div>
            <div className="flex items-center">
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 transition-colors mr-4">Login</Link>
              <Link href="/create-account" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-indigo-900 sm:text-5xl md:text-6xl">
              Our Solutions
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-indigo-700">
              Comprehensive fleet management tools designed for the modern transportation industry.
            </p>
          </div>
        </div>
      </div>

      {/* Solutions Tabs */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-indigo-200">
            <nav className="-mb-px flex space-x-8 justify-center">
              <button
                onClick={() => setActiveTab('fleet')}
                className={`${
                  activeTab === 'fleet'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-indigo-500 hover:text-indigo-700 hover:border-indigo-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Fleet Management
              </button>
              <button
                onClick={() => setActiveTab('safety')}
                className={`${
                  activeTab === 'safety'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-indigo-500 hover:text-indigo-700 hover:border-indigo-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Driver Safety
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`${
                  activeTab === 'analytics'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-indigo-500 hover:text-indigo-700 hover:border-indigo-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Analytics & Reporting
              </button>
            </nav>
          </div>

          {/* Solution Content */}
          <div className="mt-12">
            {activeTab === 'fleet' && (
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-extrabold text-indigo-900">Fleet Management</h2>
                  <p className="mt-4 text-lg text-indigo-700">
                    Our comprehensive fleet management solution provides real-time visibility into your entire operation, from vehicle locations to maintenance schedules.
                  </p>
                  <ul className="mt-8 space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Real-time GPS tracking and route optimization</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Automated maintenance scheduling and alerts</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Fuel consumption monitoring and optimization</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Vehicle utilization and efficiency metrics</p>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Link href="/contact" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="bg-indigo-100 rounded-xl p-8 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Fleet Management Dashboard" 
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}

            {activeTab === 'safety' && (
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-extrabold text-indigo-900">Driver Safety</h2>
                  <p className="mt-4 text-lg text-indigo-700">
                    Our driver safety solutions help you reduce accidents, lower insurance costs, and create a culture of safety within your organization.
                  </p>
                  <ul className="mt-8 space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Driver behavior monitoring and coaching</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Collision detection and prevention systems</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Fatigue monitoring and management</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Safety scoring and gamification</p>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Link href="/contact" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-xl p-8 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Driver Safety Interface" 
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                  <h2 className="text-3xl font-extrabold text-indigo-900">Analytics & Reporting</h2>
                  <p className="mt-4 text-lg text-indigo-700">
                    Transform your fleet data into actionable insights with our powerful analytics and customizable reporting tools.
                  </p>
                  <ul className="mt-8 space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Customizable dashboards and reports</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Predictive maintenance analytics</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Cost analysis and optimization tools</p>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0">
                        <div className="h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center">
                          <svg className="h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="ml-3 text-base text-indigo-700">Compliance and regulatory reporting</p>
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Link href="/contact" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="bg-indigo-100 rounded-xl p-8 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Analytics Dashboard" 
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-4 text-xl text-indigo-100">
              Hear what our customers have to say about their experience with Vayo.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-xl p-8 transform transition duration-500 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="mr-4 flex-shrink-0 h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="David Miller" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-indigo-900">David Miller</h3>
                  <p className="text-indigo-600">Truck Driver, 8 years experience</p>
                </div>
              </div>
              <p className="text-indigo-700">
                "The Vayo app makes my daily routes so much easier. I can track my hours, find the best routes, and communicate with dispatch all in one place. It's a game changer for drivers like me."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-xl p-8 transform transition duration-500 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="mr-4 flex-shrink-0 h-12 w-12 bg-purple-200 rounded-full flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="Sarah Thompson" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-indigo-900">Sarah Thompson</h3>
                  <p className="text-indigo-600">Delivery Driver</p>
                </div>
              </div>
              <p className="text-indigo-700">
                "The safety features actually make me feel valued. I get helpful tips rather than criticism, and I've personally seen my driving improve. My stress levels are way down since we started using Vayo."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-xl p-8 transform transition duration-500 hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="mr-4 flex-shrink-0 h-12 w-12 bg-indigo-200 rounded-full flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                    alt="Marcus Chen" 
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-indigo-900">Marcus Chen</h3>
                  <p className="text-indigo-600">Fleet Dispatcher</p>
                </div>
              </div>
              <p className="text-indigo-700">
                "As a dispatcher, Vayo has revolutionized how I coordinate our fleet. I can see everything in real-time, communicate directly with drivers, and quickly adapt to changing conditions. It's made our entire team more efficient."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-900 sm:text-4xl">
              Ready to transform your fleet operations?
            </h2>
            <p className="mt-4 text-xl text-indigo-700">
              Join the growing number of companies that trust Vayo for their fleet management needs.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 border border-transparent rounded-md text-base font-medium shadow-sm hover:from-indigo-700 hover:to-purple-700 transition-all">
                Contact Sales
              </Link>
              <Link href="/create-account" className="ml-4 bg-white text-indigo-600 px-6 py-3 border border-indigo-300 rounded-md text-base font-medium shadow-sm hover:bg-indigo-50 transition-colors">
                Start Free Trial
              </Link>
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