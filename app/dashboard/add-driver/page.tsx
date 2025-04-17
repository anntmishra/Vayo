'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface DriverForm {
  firstName: string;
  lastName: string;
  licenseNumber: string;
  licenseExpiry: string;
  phoneNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export default function AddDriver() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DriverForm>({
    firstName: '',
    lastName: '',
    licenseNumber: '',
    licenseExpiry: '',
    phoneNumber: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, we would save this to a database
    // For now, we're just simulating the action
    
    setTimeout(() => {
      // Redirect to dashboard after "saving"
      router.push('/dashboard');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-indigo-900">Add New Driver</h1>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-indigo-800">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-indigo-800">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-indigo-800">
                      Driver's License Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="licenseNumber"
                      id="licenseNumber"
                      required
                      value={formData.licenseNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="licenseExpiry" className="block text-sm font-medium text-indigo-800">
                      License Expiry Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="licenseExpiry"
                      id="licenseExpiry"
                      required
                      value={formData.licenseExpiry}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-indigo-800">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      required
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-indigo-800">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-indigo-800">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      id="address"
                      rows={3}
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-indigo-800">
                      Emergency Contact <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      id="emergencyContact"
                      required
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="emergencyPhone" className="block text-sm font-medium text-indigo-800">
                      Emergency Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      id="emergencyPhone"
                      required
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                
                <div className="pt-5 border-t border-indigo-100">
                  <div className="flex justify-end space-x-3">
                    <Link 
                      href="/dashboard"
                      className="py-2 px-4 border border-indigo-300 rounded-md shadow-sm text-sm font-medium text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Driver'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <h2 className="text-md font-medium text-indigo-900 mb-2">Driver Safety Matters</h2>
            <p className="text-sm text-indigo-700">
              Adding drivers to your fleet management system allows you to monitor driving behavior, manage schedules, and improve overall fleet safety. Drivers will receive notifications about maintenance schedules and route changes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 