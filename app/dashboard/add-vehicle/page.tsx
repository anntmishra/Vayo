'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface VehicleForm {
  registrationNumber: string;
  make: string;
  model: string;
  year: string;
  type: string;
  fuelType: string;
  tankCapacity: string;
  vin: string;
  deviceId: string;
}

export default function AddVehicle() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<VehicleForm>({
    registrationNumber: '',
    make: '',
    model: '',
    year: '',
    type: 'Heavy Truck',
    fuelType: 'Diesel',
    tankCapacity: '',
    vin: '',
    deviceId: ''
  });
  
  const vehicleTypes = ['Heavy Truck', 'Light Commercial', 'Van', 'Special Equipment'];
  const fuelTypes = ['Diesel', 'Petrol', 'CNG', 'Electric', 'Hybrid'];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      // Redirect to fleet page after "saving"
      router.push('/dashboard/fleet');
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
              <h1 className="text-2xl font-bold text-indigo-900 mb-6">Add New Vehicle</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="registrationNumber" className="block text-sm font-medium text-indigo-800">
                      Registration Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="registrationNumber"
                      id="registrationNumber"
                      required
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-indigo-800">
                      Vehicle Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {vehicleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="make" className="block text-sm font-medium text-indigo-800">
                      Make <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="make"
                      id="make"
                      required
                      value={formData.make}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-indigo-800">
                      Model <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="model"
                      id="model"
                      required
                      value={formData.model}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-indigo-800">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="year"
                      id="year"
                      required
                      min="1990"
                      max={new Date().getFullYear()}
                      value={formData.year}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="fuelType" className="block text-sm font-medium text-indigo-800">
                      Fuel Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      required
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {fuelTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="tankCapacity" className="block text-sm font-medium text-indigo-800">
                      Fuel Tank Capacity (Liters)
                    </label>
                    <input
                      type="number"
                      name="tankCapacity"
                      id="tankCapacity"
                      min="0"
                      value={formData.tankCapacity}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="vin" className="block text-sm font-medium text-indigo-800">
                      VIN/Chassis Number
                    </label>
                    <input
                      type="text"
                      name="vin"
                      id="vin"
                      value={formData.vin}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="deviceId" className="block text-sm font-medium text-indigo-800">
                      Tracking Device ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="deviceId"
                      id="deviceId"
                      required
                      value={formData.deviceId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p className="mt-1 text-sm text-indigo-500">
                      This is the unique ID of the GPS tracking device installed in the vehicle
                    </p>
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
                      {isSubmitting ? 'Saving...' : 'Save Vehicle'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-6 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
            <h2 className="text-md font-medium text-indigo-900 mb-2">What happens next?</h2>
            <p className="text-sm text-indigo-700">
              After adding a vehicle, you can install tracking devices and configure alerts. Once set up, you'll be able to track your vehicle's location, fuel usage, and performance metrics in real-time.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
} 