'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [truckCount, setTruckCount] = useState(5);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');

  // Base prices
  const basePrices = {
    standard: {
      monthly: 2074,
      annually: 1659,
    },
    premium: {
      monthly: 4149,
      annually: 3319,
    },
    enterprise: {
      monthly: 8299,
      annually: 6639,
    },
  };

  // Calculate price based on truck count
  const calculatePrice = (basePrice: number) => {
    if (truckCount <= 5) return 0; // Free tier
    
    // Cost per truck above 5
    const additionalTrucks = truckCount - 5;
    const costPerTruck = billingCycle === 'monthly' ? 331 : 248;
    
    return basePrice + (additionalTrucks * costPerTruck);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

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
                <Link href="/pricing" className="text-indigo-600 font-medium">Pricing</Link>
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
              Transparent Pricing for Every Fleet
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-indigo-100">
              Start for free with up to 5 vehicles. Scale as your fleet grows.
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Calculator */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100">
          <div className="px-6 py-8 sm:p-10">
            <h3 className="text-2xl font-bold text-indigo-900 text-center">Calculate Your Fleet Cost</h3>
            
            <div className="mt-8 max-w-lg mx-auto">
              <div className="mb-6">
                <label htmlFor="truckCount" className="block text-sm font-medium text-indigo-700 mb-2">
                  Number of Vehicles in Your Fleet
                </label>
                <div className="flex items-center">
                  <input 
                    type="range" 
                    id="truckCount"
                    min="1" 
                    max="100"
                    value={truckCount}
                    onChange={(e) => setTruckCount(parseInt(e.target.value))}
                    className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-4 px-3 py-1 bg-indigo-100 rounded-md text-indigo-800 min-w-[60px] text-center">
                    {truckCount}
                  </span>
                </div>
                {truckCount <= 5 && (
                  <p className="mt-2 text-sm text-green-600">Free tier! Up to 5 vehicles at no cost.</p>
                )}
              </div>
              
              <div className="mb-10">
                <label className="block text-sm font-medium text-indigo-700 mb-2">
                  Billing Cycle
                </label>
                <div className="flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className={`${
                      billingCycle === 'monthly'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-700 hover:bg-indigo-50'
                    } py-2 px-4 border border-indigo-300 rounded-l-md flex-1 focus:outline-none`}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    className={`${
                      billingCycle === 'annually'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white text-indigo-700 hover:bg-indigo-50'
                    } py-2 px-4 border border-indigo-300 rounded-r-md flex-1 focus:outline-none border-l-0`}
                    onClick={() => setBillingCycle('annually')}
                  >
                    Annually <span className="text-xs font-semibold">(20% OFF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="max-w-7xl mx-auto pb-24 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Standard Tier */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-indigo-900">Standard</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-indigo-600">
                  {truckCount <= 5 ? 'Free' : `₹${calculatePrice(basePrices.standard[billingCycle]).toFixed(0)}`}
                </span>
                {truckCount > 5 && (
                  <span className="ml-1 text-xl font-medium text-indigo-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-indigo-500">
                {truckCount <= 5 
                  ? 'For small fleets up to 5 vehicles' 
                  : `For fleets with ${truckCount} vehicles`}
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Real-time GPS tracking</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Basic fleet analytics</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Maintenance scheduling</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Fuel monitoring</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Email support</p>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/create-account"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Premium Tier */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-indigo-500 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="absolute inset-x-0 top-0 transform translate-y-px">
              <div className="flex justify-center transform -translate-y-1/2">
                <span className="inline-flex rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white">
                  Most Popular
                </span>
              </div>
            </div>
            <div className="p-8 pt-10">
              <h3 className="text-2xl font-bold text-indigo-900">Premium</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-indigo-600">
                  {truckCount <= 5 ? 'Free' : `₹${calculatePrice(basePrices.premium[billingCycle]).toFixed(0)}`}
                </span>
                {truckCount > 5 && (
                  <span className="ml-1 text-xl font-medium text-indigo-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-indigo-500">
                {truckCount <= 5 
                  ? 'For small fleets up to 5 vehicles' 
                  : `For fleets with ${truckCount} vehicles`}
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Everything in Standard</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Advanced analytics & reporting</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Driver behavior monitoring</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Route optimization</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Priority email & phone support</p>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/create-account"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-indigo-900">Enterprise</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-extrabold text-indigo-600">
                  {truckCount <= 5 ? 'Free' : `₹${calculatePrice(basePrices.enterprise[billingCycle]).toFixed(0)}`}
                </span>
                {truckCount > 5 && (
                  <span className="ml-1 text-xl font-medium text-indigo-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                )}
              </div>
              <p className="mt-2 text-sm text-indigo-500">
                {truckCount <= 5 
                  ? 'For small fleets up to 5 vehicles' 
                  : `For fleets with ${truckCount} vehicles`}
              </p>

              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Everything in Premium</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Custom API integrations</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Dedicated account manager</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">Custom reports & dashboards</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-3 text-base text-gray-700">24/7 priority support</p>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center px-5 py-3 border border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Trusted by Industry Leaders</h2>
            <p className="mt-4 text-xl text-indigo-100">
              Hear what our customers have to say about their experience with Vayo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fleet Manager Testimonial */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  RS
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-indigo-900">Rajesh Sharma</h3>
                  <p className="text-indigo-600">Fleet Manager, Bharat Transport</p>
                </div>
              </div>
              <p className="text-indigo-800">
                "Since implementing Vayo's fleet management system, we've reduced our fuel costs by 15% and improved our on-time delivery performance by 22%. The real-time tracking has been a game-changer for our operations."
              </p>
            </div>
            
            {/* Driver Safety Testimonial */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  AP
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-indigo-900">Anjali Patel</h3>
                  <p className="text-indigo-600">Operations Director, Express Logistics</p>
                </div>
              </div>
              <p className="text-indigo-800">
                "The driver safety features have completely transformed our safety culture. In just six months, we've seen a 40% reduction in safety incidents. My senior management team is particularly impressed with the ROI."
              </p>
            </div>
            
            {/* Analytics Testimonial */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  VK
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-indigo-900">Vikram Kumar</h3>
                  <p className="text-indigo-600">CEO, FastTrack Delivery</p>
                </div>
              </div>
              <p className="text-indigo-800">
                "The analytics tools have given us unprecedented visibility into our operations. We're now making data-driven decisions that have improved our bottom line significantly."
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Senior Testimonial */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  SM
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-indigo-900">Suresh Mehta</h3>
                  <p className="text-indigo-600">Senior Transport Officer (Retired), 68</p>
                </div>
              </div>
              <p className="text-indigo-800">
                "After 40 years in the transport industry, I've seen many technologies come and go. Vayo stands out for its simplicity and effectiveness. Even at my age, I find the dashboard intuitive and the reports comprehensive. I recommend it to all my industry colleagues."
              </p>
            </div>
            
            {/* Parent Perspective */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                  NV
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-indigo-900">Neha Verma</h3>
                  <p className="text-indigo-600">Parent & School Transport Coordinator</p>
                </div>
              </div>
              <p className="text-indigo-800">
                "As a parent coordinating school transport, Vayo has given us peace of mind. We can track the school buses in real-time, ensuring our children's safety. The alerts for any delays are particularly helpful for parents waiting at bus stops."
              </p>
            </div>
          </div>
          
            {/* College Friend Perspective */}
          {/* College Friend Perspective */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
                AR
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-indigo-900">Arjun Reddy</h3>
                <p className="text-indigo-600">Tech Entrepreneur & College Batchmate</p>
              </div>
            </div>
            <p className="text-indigo-800">
              "I've been following Vayo since its inception when my college friend pitched the idea in our final year. The UI design has evolved beautifully - clean, intuitive, and highly functional. It's amazing to see how they've refined the concept while keeping the core focus on solving real transport problems. This is exactly the kind of innovation we dreamed about in our college days!"
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-indigo-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-indigo-900 text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto divide-y-2 divide-indigo-200">
            <div className="py-6">
              <h3 className="text-xl font-semibold text-indigo-900">Is there really a free tier?</h3>
              <p className="mt-2 text-indigo-700">Yes! You can use Vayo with up to 5 vehicles completely free, forever. No credit card required.</p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-indigo-900">How does billing work?</h3>
              <p className="mt-2 text-indigo-700">We charge based on the number of vehicles and your chosen plan. You can switch between monthly and annual billing at any time.</p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-indigo-900">Can I change plans?</h3>
              <p className="mt-2 text-indigo-700">Yes, you can upgrade or downgrade your plan at any time. Prorated credits will be applied accordingly.</p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-indigo-900">What happens if I add or remove vehicles?</h3>
              <p className="mt-2 text-indigo-700">You only pay for what you use. As you add or remove vehicles, your bill will be updated automatically for the next billing cycle.</p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-indigo-900">Do you offer any discounts?</h3>
              <p className="mt-2 text-indigo-700">Yes! We offer a 20% discount for annual billing, and custom pricing for fleets with more than 100 vehicles.</p>
            </div>
            <div className="py-6">
              <h3 className="text-xl font-semibold text-indigo-900">Are prices in Indian Rupees?</h3>
              <p className="mt-2 text-indigo-700">Yes, all our pricing is in Indian Rupees (₹). We also accept payments in USD at the current exchange rate.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to get started?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Join thousands of fleet managers already using Vayo to optimize their operations.
                  Start free with up to 5 vehicles, or try our premium plans starting at ₹2,074/month.
                </p>
                <div className="mt-8 flex space-x-4">
                  <Link
                    href="/create-account"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                  >
                    Create Free Account
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-indigo-700"
                  >
                    Try Demo
                  </Link>
                </div>
              </div>
              <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
                <div className="ml-3 lg:ml-0">
                  <img 
                    className="h-56 w-auto object-cover lg:h-full rounded-lg shadow-lg" 
                    src="/images/dashboard-preview.jpg" 
                    alt="Vayo Dashboard Preview"
                  />
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
            <p className="text-indigo-300 text-center">© {new Date().getFullYear()} Vayo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 