'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getCurrentUser, logoutUser } from '../lib/auth';

// Sample map component to replace the LiveFleetMap integration
function SampleMap({ vehicles }: { vehicles: MapVehicle[] }) {
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
        <div className="absolute bottom-3 left-3 bg-white/70 p-2 rounded text-xs text-indigo-700 font-medium">Sample Map View</div>
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

// Map loading and fallback components
function MapLoadingPlaceholder() {
  return (
    <div className="flex items-center justify-center w-full h-[400px] bg-gray-50 rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
        <p className="text-indigo-700 text-sm">Loading map...</p>
      </div>
    </div>
  );
}

function MapFallback() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[400px] bg-gray-50 rounded-xl">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-400 mb-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
      <p className="text-indigo-700">Map view not available</p>
      <p className="text-indigo-500 text-sm">Please check your connection or try again later</p>
      <Link href="/dashboard/fleet" className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
        Go to Fleet Page
      </Link>
    </div>
  );
}

interface UserData {
  id: string;
  company: string;
  email: string;
  role: string;
  truckCount: number;
  isPremium: boolean;
}

// Vehicle interface for displaying vehicle information
interface Vehicle {
  id: number;
  name: string;
  driver: string;
  speed: number;
  route: string;
}

// LiveFleetMap uses a different Vehicle interface
interface MapVehicle {
  id: string;
  licensePlate: string;
  driver: string;
  model: string;
  status: 'active' | 'idle' | 'maintenance';
  location?: {
    lat: number;
    lng: number;
    route: string;
    speed: number;
  };
}

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [mapVehicles, setMapVehicles] = useState<MapVehicle[]>([]);
  const router = useRouter();

  // Generate random vehicle data
  useEffect(() => {
    if (user) {
      const vehicleCount = user.truckCount || 5;
      const drivers = ['Vikram Singh', 'Priya Mehta', 'Rahul Kumar', 'Aisha Patel', 'Deepak Verma', 'Sanya Sharma', 'Aditya Reddy'];
      const models = ['TATA LPT 2518', 'Ashok Leyland Boss', 'Mahindra Blazo', 'BharatBenz 1617R', 'Eicher Pro 6025'];
      
      // Generate random vehicle data
      const mockVehicles: Vehicle[] = Array.from({ length: vehicleCount }, (_, i) => ({
        id: i + 1,
        name: `Truck ${i + 1}`,
        driver: drivers[i % drivers.length],
        speed: Math.floor(Math.random() * 80),
        route: `Route ${Math.floor(Math.random() * 90) + 10}`
      }));
      
      setVehicles(mockVehicles);
      
      // Create map vehicle data
      const mockMapVehicles: MapVehicle[] = mockVehicles.map((v, i) => {
        const status: ('active' | 'idle' | 'maintenance') = 
          i < vehicleCount * 0.8 ? 'active' : 
          i < vehicleCount * 0.95 ? 'idle' : 'maintenance';
        
        return {
          id: `VEH-${v.id}`,
          licensePlate: `MH-${10 + Math.floor(Math.random() * 90)}-${1000 + Math.floor(Math.random() * 9000)}`,
          driver: v.driver,
          model: models[i % models.length],
          status: status
        };
      });
      
      setMapVehicles(mockMapVehicles);
    }
  }, [user]);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          // Create a mock user object from the local storage user data
          setUser({
            id: `user-${Math.floor(Math.random() * 10000)}`,
            company: currentUser.name || 'Company Name',
            email: currentUser.email,
            role: 'admin',
            truckCount: 8,
            isPremium: false
          });
        } else {
          // If not logged in, redirect to login page
          router.push('/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    try {
      logoutUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-indigo-50/30">
      {/* Navigation */}
      <header className="py-4 border-b border-indigo-100 sticky top-0 bg-white z-10">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Vayo</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/dashboard" className="text-indigo-600 font-medium">Dashboard</Link>
            <Link href="/dashboard/fleet" className="text-indigo-900 hover:text-indigo-600 transition-colors">Fleet</Link>
            <Link href="/dashboard/reports" className="text-indigo-900 hover:text-indigo-600 transition-colors">Reports</Link>
            <Link href="/dashboard/settings" className="text-indigo-900 hover:text-indigo-600 transition-colors">Settings</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-indigo-900">{user.company}</p>
              <p className="text-xs text-indigo-500">{user.email}</p>
            </div>
            <div className="relative group">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-medium cursor-pointer">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-indigo-100 hidden group-hover:block">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-50">
                    Account Settings
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-indigo-700 hover:bg-indigo-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 flex-grow">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8 text-indigo-900">Welcome, {user.company}</h1>
          
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
                <button onClick={() => alert('View refreshed!')} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <Link href="/dashboard/fleet" className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center">
                  View Full Map
                </Link>
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
          
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
            <h2 className="text-xl font-semibold mb-4 text-indigo-900">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/fleet" className="flex flex-col items-center justify-center p-4 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                <span className="text-sm text-indigo-700">Add Vehicle</span>
              </Link>
              <button onClick={() => alert('Driver management feature coming soon!')} className="flex flex-col items-center justify-center p-4 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <span className="text-sm text-indigo-700">Add Driver</span>
              </button>
              <Link href="/dashboard/team-access" className="flex flex-col items-center justify-center p-4 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6 0 3.375 3.375 0 0 1 6 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <span className="text-sm text-indigo-700">Team Access</span>
              </Link>
              <Link href="/dashboard/alerts" className="flex flex-col items-center justify-center p-4 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <span className="text-sm text-indigo-700">Configure Alerts</span>
              </Link>
            </div>
          </div>
          
          {/* Live View */}
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-900">Fleet Overview</h2>
              <div className="flex gap-2">
                <button onClick={() => alert('View refreshed!')} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button onClick={() => alert('Filter options will be available soon!')} className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-md transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Current Active Vehicles */}
            <div>
              <h3 className="text-md font-medium text-indigo-900 mb-3">Active Vehicles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="p-3 border border-indigo-100 rounded-lg flex items-center justify-between cursor-pointer hover:bg-indigo-50 transition-colors" onClick={() => alert(`Truck ${vehicle.id} Details`)}>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-3"></div>
                      <div>
                        <div className="font-medium text-indigo-900">{vehicle.name}</div>
                        <div className="text-sm text-indigo-600">Driver: {vehicle.driver}</div>
                      </div>
                    </div>
                    <div className="text-xs text-indigo-500 text-right">
                      <div>Speed: {vehicle.speed} km/h</div>
                      <div>Location: {vehicle.route}</div>
                    </div>
                  </div>
                ))}
              </div>
              {vehicles.length > 6 && (
                <div className="mt-3 text-center">
                  <button 
                    onClick={() => alert('View all vehicles feature will be available soon!')}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    View all {vehicles.length} vehicles
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Weekly Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-indigo-900">Weekly Summary</h2>
              <Link href="/dashboard/reports" className="text-indigo-600 hover:text-indigo-800 text-sm">
                View Full Reports
              </Link>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-indigo-700 mb-2">Distance Traveled</h3>
                  <div className="flex items-end space-x-1">
                    {[65, 85, 45, 75, 90, 50, 70].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-indigo-500 rounded-t"
                          style={{ height: `${height}px` }}
                        ></div>
                        <div className="text-xs mt-1 text-indigo-500">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-indigo-700">Total: <span className="font-medium">{user.truckCount * 120 * 7} km</span></span>
                    <span className="text-xs text-green-600">↑ 12% vs last week</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-indigo-700 mb-2">Fuel Consumption</h3>
                  <div className="flex items-end space-x-1">
                    {[50, 70, 30, 80, 40, 30, 60].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-purple-500 rounded-t"
                          style={{ height: `${height}px` }}
                        ></div>
                        <div className="text-xs mt-1 text-indigo-500">
                          {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-indigo-700">Total: <span className="font-medium">{user.truckCount * 15 * 7} L</span></span>
                    <span className="text-xs text-green-600">↓ 5% vs last week</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-indigo-700 mb-2">Driver Scores</h3>
                  <div className="space-y-3">
                    {['Vikram Singh', 'Priya Mehta', 'Rahul Kumar'].map((driver, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{driver}</span>
                          <span className="font-medium">{85 - (index * 5)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              85 - (index * 5) > 85 ? 'bg-green-500' : 
                              85 - (index * 5) > 70 ? 'bg-indigo-500' : 
                              85 - (index * 5) > 60 ? 'bg-amber-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${85 - (index * 5)}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => alert('Driver ranking feature will be available soon!')}
                      className="text-xs text-indigo-600 hover:text-indigo-800"
                    >
                      View all drivers
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 