'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  demoCompanies,
  getDemoVehicles,
  getDemoMapVehicles,
  DemoVehicle, 
  DemoMapVehicle
} from '../lib/demoData';

// Sample map component to replace the LiveFleetMap integration
function SampleMap({ vehicles }: { vehicles: DemoMapVehicle[] }) {
  return (
    <div className="w-full h-[400px] bg-gray-100 rounded-xl relative overflow-hidden">
      {/* Simple map background with grid lines */}
      <div className="absolute inset-0 bg-[#EBF1FB]">
        <div className="grid grid-cols-12 grid-rows-8 h-full w-full">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="border border-[#D5E3F7] opacity-40"></div>
          ))}
        </div>
        
        {/* Major "roads" */}
        <div className="absolute top-1/4 left-0 right-0 h-1 bg-[#A8C3E8]"></div>
        <div className="absolute top-2/3 left-0 right-0 h-1 bg-[#A8C3E8]"></div>
        <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-[#A8C3E8]"></div>
        <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-[#A8C3E8]"></div>
        
        {/* Vehicle indicators */}
        {vehicles.slice(0, 6).map((vehicle, index) => {
          // Generate random positions for vehicles
          const top = 10 + Math.floor(Math.random() * 80);
          const left = 10 + Math.floor(Math.random() * 80);
          
          return (
            <div 
              key={vehicle.id}
              className="absolute w-4 h-4 rounded-full bg-indigo-600 shadow-md transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                top: `${top}%`, 
                left: `${left}%`,
                backgroundColor: vehicle.status === 'active' ? '#4F46E5' : 
                                vehicle.status === 'idle' ? '#7C3AED' : '#DC2626'
              }}
              title={`${vehicle.licensePlate} - ${vehicle.driver}`}
            >
              <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-50"></div>
            </div>
          );
        })}
        
        {/* Map labels */}
        <div className="absolute bottom-3 left-3 bg-white/70 p-2 rounded text-xs text-indigo-700 font-medium">Demo Map View</div>
        <div className="absolute top-3 right-3 bg-white/70 p-2 rounded text-xs flex items-center">
          <span className="w-2 h-2 rounded-full bg-indigo-600 mr-1"></span>
          <span className="text-indigo-700">Active</span>
          <span className="w-2 h-2 rounded-full bg-purple-600 mx-1 ml-2"></span>
          <span className="text-indigo-700">Idle</span>
          <span className="w-2 h-2 rounded-full bg-red-600 mx-1 ml-2"></span>
          <span className="text-indigo-700">Maintenance</span>
        </div>
      </div>
    </div>
  );
}

// Map fallback component
function MapFallback() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] bg-gray-50 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-400 mb-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
      <p className="text-indigo-700">Map view not available</p>
      <p className="text-indigo-500 text-sm">Please check your connection or try again later</p>
    </div>
  );
}

export default function DemoPage() {
  const [vehicles, setVehicles] = useState<DemoVehicle[]>([]);
  const [mapVehicles, setMapVehicles] = useState<DemoMapVehicle[]>([]);
  
  useEffect(() => {
    // Use the first demo company
    const demoCompany = demoCompanies[0];
    
    // Get demo vehicles and map vehicles
    setVehicles(getDemoVehicles(demoCompany.truckCount));
    setMapVehicles(getDemoMapVehicles(demoCompany.truckCount));
  }, []);

  // Demo user data
  const user = {
    id: 'demo-user',
    company: 'Demo Company',
    email: 'demo@vayo.com',
    role: 'viewer',
    truckCount: demoCompanies[0].truckCount,
    isPremium: demoCompanies[0].isPremium
  };

  return (
    <div className="min-h-screen flex flex-col bg-indigo-50/30">
      {/* Demo Banner */}
      <div className="bg-amber-500 text-white p-2 text-center">
        <p className="text-sm font-medium">
          This is a demo view. <Link href="/create-account" className="underline">Create an account</Link> or <Link href="/login" className="underline">sign in</Link> to get started.
        </p>
      </div>
      
      {/* Navigation */}
      <header className="py-4 border-b border-indigo-100 sticky top-0 bg-white z-10">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Vayo</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <span className="text-indigo-600 font-medium">Dashboard</span>
            <span className="text-indigo-900 hover:text-indigo-600 transition-colors">Fleet</span>
            <span className="text-indigo-900 hover:text-indigo-600 transition-colors">Reports</span>
            <span className="text-indigo-900 hover:text-indigo-600 transition-colors">Settings</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-indigo-900">{user.company}</p>
              <p className="text-xs text-indigo-500">{user.email}</p>
            </div>
            <div className="relative group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-medium cursor-pointer">
                D
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 flex-grow">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8 text-indigo-900">Welcome to the Vayo Demo</h1>
          
          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-indigo-900">Account Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-indigo-500 mb-1">Company Name</p>
                <p className="font-medium text-indigo-900">{user.company}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-500 mb-1">Email</p>
                <p className="font-medium text-indigo-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-500 mb-1">Account Type</p>
                <p className="font-medium text-indigo-900">{user.isPremium ? 'Premium' : 'Standard'}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-500 mb-1">Role</p>
                <p className="font-medium text-indigo-900 capitalize">{user.role}</p>
              </div>
              <div>
                <p className="text-sm text-indigo-500 mb-1">Fleet Size</p>
                <p className="font-medium text-indigo-900">{user.truckCount} vehicles</p>
              </div>
              <div>
                <p className="text-sm text-indigo-500 mb-1">Account ID</p>
                <p className="font-medium text-xs text-indigo-900">{user.id}</p>
              </div>
            </div>
          </div>
          
          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-indigo-900">Fleet Status</h3>
                <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-indigo-500">Active</span>
                  <span className="font-medium text-indigo-900">{Math.floor(user.truckCount * 0.8)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-500">Idle</span>
                  <span className="font-medium text-indigo-900">{Math.ceil(user.truckCount * 0.15)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-500">Maintenance</span>
                  <span className="font-medium text-indigo-900">{Math.ceil(user.truckCount * 0.05)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-indigo-900">Today's Activity</h3>
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-indigo-500">Deliveries</span>
                  <span className="font-medium text-indigo-900">{Math.floor(user.truckCount * 1.5)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-500">Distance</span>
                  <span className="font-medium text-indigo-900">{user.truckCount * 120} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-indigo-500">Fuel Used</span>
                  <span className="font-medium text-indigo-900">{user.truckCount * 15} L</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-indigo-900">Alerts</h3>
                <div className="h-8 w-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-sm">
                  <p className="font-medium text-amber-800">Maintenance Due</p>
                  <p className="text-amber-700">Vehicle TB-{Math.floor(Math.random() * 1000)} scheduled service</p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border border-red-100 text-sm">
                  <p className="font-medium text-red-800">Hard Braking</p>
                  <p className="text-red-700">Vehicle TB-{Math.floor(Math.random() * 1000)} at 13:45</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Integration */}
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-900">Live Fleet Tracking</h2>
              <div className="flex gap-2">
                <button className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <span className="text-indigo-600 text-sm flex items-center cursor-pointer">
                  View Full Map
                </span>
              </div>
            </div>
            
            {/* Map with fallback */}
            {mapVehicles.length > 0 ? (
              <div className="relative">
                <SampleMap vehicles={mapVehicles} />
              </div>
            ) : (
              <MapFallback />
            )}
          </div>
          
          {/* Actions */}
          <div className="flex justify-center mt-8">
            <Link href="/create-account" className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all mr-4">
              Create Your Account
            </Link>
            <Link href="/login" className="py-3 px-6 border border-indigo-300 text-indigo-700 hover:bg-indigo-50 rounded-lg transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t border-indigo-100 py-6">
        <div className="container-custom">
          <p className="text-center text-sm text-indigo-500">This is a demo of the Vayo platform. All data shown is simulated.</p>
        </div>
      </footer>
    </div>
  );
} 