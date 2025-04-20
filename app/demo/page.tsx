'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [showCredentials, setShowCredentials] = useState(false);
  const router = useRouter();

  const demoCredentials = {
    email: 'demo@vayo.com',
    password: 'demo1234'
  };

  const copyCredentials = () => {
    navigator.clipboard.writeText(`Email: ${demoCredentials.email}\nPassword: ${demoCredentials.password}`);
    alert('Demo credentials copied to clipboard!');
  };

  const handleLogin = async () => {
    try {
      // Actual authentication attempt with demo credentials
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: demoCredentials.email,
          password: demoCredentials.password,
          rememberMe: true
        }),
      });

      if (response.ok) {
        // Successful login - redirect to dashboard
        router.push('/dashboard');
      } else {
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred. Please try again.');
    }
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
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Try Vayo Demo
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-indigo-100">
              Experience how Vayo helps you manage your fleet more efficiently
            </p>
            
            {/* Demo Credentials */}
            <div className="mt-8">
              <button
                onClick={() => setShowCredentials(!showCredentials)}
                className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-md text-indigo-100 bg-indigo-700 hover:bg-indigo-800 transition-colors"
              >
                {showCredentials ? 'Hide Credentials' : 'Show Demo Credentials'}
              </button>
              
              {showCredentials && (
                <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg inline-block text-left">
                  <h3 className="font-bold text-indigo-100 mb-2">Demo Login Credentials:</h3>
                  <p className="text-indigo-100">Email: {demoCredentials.email}</p>
                  <p className="text-indigo-100">Password: {demoCredentials.password}</p>
                  <button
                    onClick={copyCredentials}
                    className="mt-3 text-xs px-3 py-1 bg-indigo-800 rounded hover:bg-indigo-900 transition-colors"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={handleLogin}
                    className="ml-2 mt-3 text-xs px-3 py-1 bg-green-600 rounded hover:bg-green-700 transition-colors"
                  >
                    Quick Login
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Demo Steps */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Step Navigation */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setActiveStep(1)}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeStep === 1 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-indigo-700 hover:bg-indigo-50'
                } border border-indigo-200`}
              >
                Step 1: Configure
              </button>
              <button
                onClick={() => setActiveStep(2)}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeStep === 2 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-indigo-700 hover:bg-indigo-50'
                } border border-l-0 border-indigo-200`}
              >
                Step 2: Monitor
              </button>
            </div>
          </div>

          {/* Step 1: Fleet Configuration Demo */}
          {activeStep === 1 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-indigo-600 flex items-center justify-center md:w-24">
                  <div className="h-12 w-12 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-2xl font-bold text-indigo-900 mb-4">Configure Your Fleet</div>
                  <p className="text-lg text-indigo-700 mb-6">
                    Add your vehicles and customize tracking parameters to match your needs.
                  </p>
                  
                  {/* Fleet Configuration Demo UI */}
                  <div className="border border-indigo-100 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-4">Demo Fleet</h3>
                    
                    <div className="space-y-4">
                      {/* Sample Vehicle List */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {['Truck 1', 'Truck 2', 'Truck 3'].map((vehicle, index) => (
                          <div key={index} className="border border-indigo-100 rounded-lg p-4 bg-indigo-50/50 cursor-pointer hover:shadow-md transition-all" onClick={() => alert(`${vehicle} details - coming soon!`)}>
                            <div className="font-medium text-indigo-800">{vehicle}</div>
                            <div className="text-sm text-indigo-600">License: TB-{1000 + index}</div>
                            <div className="text-xs text-indigo-500 mt-2">Status: Active</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Add Vehicle */}
                      <div 
                        className="border border-dashed border-indigo-300 rounded-lg p-4 flex items-center justify-center hover:bg-indigo-50/50 cursor-pointer transition-colors"
                        onClick={() => alert('Add vehicle functionality will be available after login!')}
                      >
                        <div className="text-indigo-500 flex flex-col items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mb-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          <span>Add Vehicle</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Configuration Options */}
                    <div className="mt-6 pt-6 border-t border-indigo-100">
                      <h4 className="font-medium text-indigo-800 mb-3">Tracking Parameters</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-indigo-700 mb-1">Tracking Interval</label>
                          <select 
                            className="w-full px-3 py-2 border border-indigo-200 rounded-md cursor-pointer"
                            onChange={() => alert('Settings will be saved after login!')}
                            defaultValue="Every 15 minutes"
                          >
                            <option>Every 1 minute</option>
                            <option>Every 5 minutes</option>
                            <option>Every 15 minutes</option>
                            <option>Every 30 minutes</option>
                            <option>Every hour</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-indigo-700 mb-1">Alert Thresholds</label>
                          <select 
                            className="w-full px-3 py-2 border border-indigo-200 rounded-md cursor-pointer"
                            onChange={() => alert('Settings will be saved after login!')}
                            defaultValue="Medium"
                          >
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                            <option>Custom</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Link href="/" className="text-indigo-600 hover:text-indigo-800">
                      Back to Home
                    </Link>
                    <button 
                      onClick={() => setActiveStep(2)}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all"
                    >
                      Next: Start Monitoring
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Monitoring Demo */}
          {activeStep === 2 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0 bg-indigo-600 flex items-center justify-center md:w-24">
                  <div className="h-12 w-12 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-2xl font-bold text-indigo-900 mb-4">Start Monitoring</div>
                  <p className="text-lg text-indigo-700 mb-6">
                    Access real-time data and insights about your fleet's performance.
                  </p>
                  
                  {/* Monitoring Demo UI */}
                  <div className="border border-indigo-100 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-4">Live Fleet Overview</h3>
                    
                    {/* Map Placeholder */}
                    <div 
                      className="h-64 bg-indigo-100 rounded-lg mb-6 flex items-center justify-center cursor-pointer hover:bg-indigo-200 transition-colors"
                      onClick={() => alert('Interactive map will be available after login!')}
                    >
                      <div className="text-indigo-500 font-medium">
                        Interactive Map View
                      </div>
                    </div>
                    
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="border border-indigo-100 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all" onClick={() => alert('Vehicle status details - coming soon!')}>
                        <div className="text-sm text-indigo-500">Vehicles Active</div>
                        <div className="text-2xl font-bold text-indigo-800">3/3</div>
                        <div className="text-xs text-green-600 mt-1">All vehicles online</div>
                      </div>
                      <div className="border border-indigo-100 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all" onClick={() => alert('Distance tracking details - coming soon!')}>
                        <div className="text-sm text-indigo-500">Total Distance Today</div>
                        <div className="text-2xl font-bold text-indigo-800">324 km</div>
                        <div className="text-xs text-indigo-600 mt-1">↑ 12% from yesterday</div>
                      </div>
                      <div className="border border-indigo-100 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all" onClick={() => alert('Fuel consumption details - coming soon!')}>
                        <div className="text-sm text-indigo-500">Fuel Consumption</div>
                        <div className="text-2xl font-bold text-indigo-800">48 L</div>
                        <div className="text-xs text-green-600 mt-1">↓ 5% from average</div>
                      </div>
                    </div>
                    
                    {/* Recent Activity */}
                    <div>
                      <h4 className="font-medium text-indigo-800 mb-3">Recent Activity</h4>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-indigo-50/50 rounded-lg cursor-pointer hover:bg-indigo-100/50 transition-colors" onClick={() => alert('Activity details - coming soon!')}>
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                          <div>
                            <div className="text-sm text-indigo-800">Truck 1 arrived at Warehouse B</div>
                            <div className="text-xs text-indigo-500">15 minutes ago</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-indigo-50/50 rounded-lg cursor-pointer hover:bg-indigo-100/50 transition-colors" onClick={() => alert('Maintenance alert details - coming soon!')}>
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-3"></div>
                          <div>
                            <div className="text-sm text-indigo-800">Truck 2 maintenance alert</div>
                            <div className="text-xs text-indigo-500">32 minutes ago</div>
                          </div>
                        </div>
                        <div className="flex items-center p-3 bg-indigo-50/50 rounded-lg cursor-pointer hover:bg-indigo-100/50 transition-colors" onClick={() => alert('Route details - coming soon!')}>
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                          <div>
                            <div className="text-sm text-indigo-800">Truck 3 started route to Client XYZ</div>
                            <div className="text-xs text-indigo-500">1 hour ago</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button 
                      onClick={() => setActiveStep(1)}
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      Back to Configure
                    </button>
                    <Link
                      href="/dashboard"
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all"
                    >
                      Go to Full Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50 mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-indigo-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-600">Create your account today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/create-account"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Create Account
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Contact Sales
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