'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LiveFleetMap from '../../components/LiveFleetMap';
import { useAuth } from '../../lib/AuthContext';
import { getDemoCompanyForUser } from '../../lib/demoData';

interface UserData {
  id: string;
  company: string;
  email: string;
  role: string;
  truckCount: number;
  isPremium: boolean;
}

interface Vehicle {
  id: string;
  licensePlate: string;
  model: string;
  year: number;
  status: 'active' | 'idle' | 'maintenance';
  lastService: string;
  driver: string;
  fuelLevel: number;
  location?: {
    lat: number;
    lng: number;
    route: string;
    speed: number;
  };
}

export default function Fleet() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState<{
    licensePlate: string;
    model: string;
    year: string;
    driver: string;
  }>({
    licensePlate: '',
    model: '',
    year: new Date().getFullYear().toString(),
    driver: ''
  });
  const router = useRouter();
  const { user: authUser, loading: authLoading } = useAuth();

  useEffect(() => {
    // Use AuthContext instead of direct API call
    if (!authLoading) {
      if (authUser) {
        // Get demo company data based on the user's email
        const demoCompany = getDemoCompanyForUser(authUser.email);
        
        // Create a user object combining Firebase auth and demo data
        setUser({
          id: authUser.uid || `user-${Math.floor(Math.random() * 10000)}`,
          company: authUser.name || demoCompany.name,
          email: authUser.email,
          role: demoCompany.role,
          truckCount: demoCompany.truckCount,
          isPremium: demoCompany.isPremium
        });
        
        // Generate mock vehicle data based on truck count
        generateMockVehicles(demoCompany.truckCount);
        setLoading(false);
      } else {
        // If not logged in, redirect to login page
        router.push('/login');
      }
    }
  }, [authUser, authLoading, router]);

  const generateMockVehicles = (count: number) => {
    // Return empty array regardless of count
    const mockVehicles: Vehicle[] = [];
    setVehicles(mockVehicles);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Special handling for demo user
    if (user && user.id === 'demo123') {
      // Still allow adding vehicles in demo mode, but show a message
      alert('Demo Mode: Vehicle added successfully (note: changes will not persist after session ends)');
    }
    
    // Create new vehicle with form data
    const vehicle: Vehicle = {
      id: `VEH-${1000 + vehicles.length + 1}`,
      licensePlate: newVehicle.licensePlate,
      model: newVehicle.model,
      year: parseInt(newVehicle.year),
      status: 'active',
      lastService: new Date().toISOString().split('T')[0],
      driver: newVehicle.driver,
      fuelLevel: 100
    };
    
    // Add to vehicles list
    setVehicles([vehicle, ...vehicles]);
    
    // Reset form and close modal
    setNewVehicle({
      licensePlate: '',
      model: '',
      year: new Date().getFullYear().toString(),
      driver: ''
    });
    setShowAddVehicleModal(false);
  };

  // Add a function to handle vehicle status updates
  const handleStatusUpdate = (vehicleId: string, newStatus: 'active' | 'idle' | 'maintenance') => {
    // Special handling for demo user
    if (user && user.id === 'demo123') {
      alert(`Demo Mode: Vehicle status updated to ${newStatus} (note: changes will not persist after session ends)`);
    }
    
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, status: newStatus } : vehicle
    ));
  };

  // Add a function to handle vehicle deletion
  const handleDeleteVehicle = (vehicleId: string) => {
    // Special handling for demo user
    if (user && user.id === 'demo123') {
      alert('Demo Mode: Vehicle removed (note: changes will not persist after session ends)');
    }
    
    setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'idle':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'maintenance':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-700">Loading fleet data...</p>
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
            <Link href="/dashboard" className="text-indigo-900 hover:text-indigo-600 transition-colors">Dashboard</Link>
            <Link href="/dashboard/fleet" className="text-indigo-600 font-medium">Fleet</Link>
            <Link href="/dashboard/reports" className="text-indigo-900 hover:text-indigo-600 transition-colors">Reports</Link>
            <Link href="/dashboard/settings" className="text-indigo-900 hover:text-indigo-600 transition-colors">Settings</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-indigo-900">{user.company}</p>
              <p className="text-xs text-indigo-500">{user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-medium">
              {user.email.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 flex-grow">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold text-indigo-900">Fleet Management</h1>
            <button 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all flex items-center"
              onClick={() => setShowAddVehicleModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Vehicle
            </button>
          </div>

          {/* Live Fleet View */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-900 mb-4 flex items-center justify-between">
              <span>Live Fleet View</span>
              <div className="flex items-center">
                <button className="text-indigo-600 hover:text-indigo-800 p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button>
                <button className="text-indigo-600 hover:text-indigo-800 ml-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                  </svg>
                </button>
              </div>
            </h2>
            <LiveFleetMap vehicles={vehicles} />
          </div>

          {/* Active Vehicles */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">Active Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {vehicles
                .filter(v => v.status === 'active')
                .slice(0, 3)
                .map((vehicle, index) => (
                  <div key={`active-${vehicle.id}`} className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">Truck {index + 1}</h3>
                      <p className="text-sm text-indigo-500">Driver: {vehicle.driver}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-indigo-500">Speed: {vehicle.location?.speed || Math.floor(10 + Math.random() * 40)} km/h</p>
                      <p className="text-sm text-indigo-500">Location: {vehicle.location?.route || `Route ${Math.floor(Math.random() * 100)}`}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                View all {vehicles.filter(v => v.status === 'active').length} vehicles
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-indigo-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    id="search"
                    className="w-full pl-10 pr-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    placeholder="Search by license plate, model, or driver"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <label htmlFor="status" className="block text-sm font-medium text-indigo-700 mb-1">
                  Status
                </label>
                <select 
                  id="status"
                  className="w-full py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="idle">Idle</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Vehicle List */}
          <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-indigo-200">
                <thead className="bg-indigo-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Vehicle ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      License Plate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Last Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Fuel Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-indigo-200">
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-indigo-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-900">
                          {vehicle.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                          {vehicle.licensePlate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                          {vehicle.model}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                          {vehicle.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(vehicle.status)}`}>
                            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                          {vehicle.lastService}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                          {vehicle.driver}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-indigo-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  vehicle.fuelLevel > 70 ? 'bg-green-500' : 
                                  vehicle.fuelLevel > 30 ? 'bg-amber-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${vehicle.fuelLevel}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs text-indigo-500">{vehicle.fuelLevel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-indigo-600 hover:text-indigo-700 mr-3"
                            onClick={() => {
                              const newStatus = vehicle.status === 'active' ? 'idle' : 'active';
                              handleStatusUpdate(vehicle.id, newStatus);
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteVehicle(vehicle.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-6 py-4 text-center text-sm text-indigo-500">
                        No vehicles found matching the criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fleet Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Fleet Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-indigo-500 mb-1">Total Vehicles</p>
                  <p className="text-2xl font-medium">{vehicles.length}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-indigo-500 mb-1">Active</p>
                    <p className="text-xl font-medium text-green-600">
                      {vehicles.filter(v => v.status === 'active').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-indigo-500 mb-1">Idle</p>
                    <p className="text-xl font-medium text-blue-600">
                      {vehicles.filter(v => v.status === 'idle').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-indigo-500 mb-1">Maintenance</p>
                    <p className="text-xl font-medium text-amber-600">
                      {vehicles.filter(v => v.status === 'maintenance').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Upcoming Services</h2>
              <div className="space-y-3">
                {vehicles
                  .filter(v => {
                    const serviceDate = new Date(v.lastService);
                    const today = new Date();
                    const diffDays = Math.ceil((today.getTime() - serviceDate.getTime()) / (1000 * 60 * 60 * 24));
                    return diffDays > 75; // Vehicles that haven't been serviced in 75+ days
                  })
                  .slice(0, 3)
                  .map(vehicle => (
                    <div key={`service-${vehicle.id}`} className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-sm">
                      <div className="flex justify-between">
                        <p className="font-medium text-amber-800">{vehicle.licensePlate}</p>
                        <p className="text-amber-700">Last: {vehicle.lastService}</p>
                      </div>
                      <p className="text-amber-700 text-xs">{vehicle.model}</p>
                    </div>
                  ))
                }
                {vehicles.filter(v => {
                  const serviceDate = new Date(v.lastService);
                  const today = new Date();
                  const diffDays = Math.ceil((today.getTime() - serviceDate.getTime()) / (1000 * 60 * 60 * 24));
                  return diffDays > 75;
                }).length === 0 && (
                  <p className="text-sm text-indigo-500">No upcoming services</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Low Fuel Vehicles</h2>
              <div className="space-y-3">
                {vehicles
                  .filter(v => v.fuelLevel < 25)
                  .slice(0, 3)
                  .map(vehicle => (
                    <div key={`fuel-${vehicle.id}`} className="p-3 bg-red-50 rounded-lg border border-red-100 text-sm">
                      <div className="flex justify-between">
                        <p className="font-medium text-red-800">{vehicle.licensePlate}</p>
                        <p className="text-red-700">{vehicle.fuelLevel}% fuel</p>
                      </div>
                      <p className="text-red-700 text-xs">{vehicle.model}</p>
                    </div>
                  ))
                }
                {vehicles.filter(v => v.fuelLevel < 25).length === 0 && (
                  <p className="text-sm text-indigo-500">No vehicles with low fuel</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Vehicle</h2>
              <button 
                onClick={() => setShowAddVehicleModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-700 mb-1">
                  License Plate *
                </label>
                <input
                  type="text"
                  id="licensePlate"
                  value={newVehicle.licensePlate}
                  onChange={(e) => setNewVehicle({...newVehicle, licensePlate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
                  Model *
                </label>
                <select
                  id="model"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({...newVehicle, model: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select Model</option>
                  <option value="Volvo FH16">Volvo FH16</option>
                  <option value="Mercedes Actros">Mercedes Actros</option>
                  <option value="Scania R500">Scania R500</option>
                  <option value="MAN TGX">MAN TGX</option>
                  <option value="DAF XF">DAF XF</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                  Year *
                </label>
                <input
                  type="number"
                  id="year"
                  min="2000"
                  max={new Date().getFullYear()}
                  value={newVehicle.year}
                  onChange={(e) => setNewVehicle({...newVehicle, year: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="driver" className="block text-sm font-medium text-gray-700 mb-1">
                  Driver
                </label>
                <input
                  type="text"
                  id="driver"
                  value={newVehicle.driver}
                  onChange={(e) => setNewVehicle({...newVehicle, driver: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddVehicleModal(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 