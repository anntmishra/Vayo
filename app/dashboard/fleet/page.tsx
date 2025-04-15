'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          
          // Generate mock vehicle data based on truck count
          generateMockVehicles(data.user.truckCount);
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

  const generateMockVehicles = (count: number) => {
    const statuses = ['active', 'idle', 'maintenance'];
    const models = ['Volvo FH16', 'Mercedes Actros', 'Scania R500', 'MAN TGX', 'DAF XF'];
    const mockVehicles: Vehicle[] = [];
    
    for (let i = 1; i <= count; i++) {
      const statusIndex = Math.floor(Math.random() * 100);
      let status: 'active' | 'idle' | 'maintenance';
      
      // Make 80% active, 15% idle, 5% maintenance
      if (statusIndex < 80) status = 'active';
      else if (statusIndex < 95) status = 'idle';
      else status = 'maintenance';
      
      const serviceDate = new Date();
      serviceDate.setDate(serviceDate.getDate() - Math.floor(Math.random() * 90));
      
      mockVehicles.push({
        id: `VEH-${1000 + i}`,
        licensePlate: `TR-${Math.floor(1000 + Math.random() * 9000)}`,
        model: models[Math.floor(Math.random() * models.length)],
        year: 2018 + Math.floor(Math.random() * 6),
        status: status,
        lastService: serviceDate.toISOString().split('T')[0],
        driver: `Driver ${i}`,
        fuelLevel: Math.floor(Math.random() * 100)
      });
    }
    
    setVehicles(mockVehicles);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Loading fleet data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      {/* Navigation */}
      <header className="py-4 border-b border-border sticky top-0 bg-white z-10">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Vayo</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="/dashboard" className="text-secondary hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/dashboard/fleet" className="text-primary font-medium">Fleet</Link>
            <Link href="/dashboard/reports" className="text-secondary hover:text-primary transition-colors">Reports</Link>
            <Link href="/dashboard/settings" className="text-secondary hover:text-primary transition-colors">Settings</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-secondary">{user.company}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
              {user.email.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 flex-grow">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-bold">Fleet Management</h1>
            <button 
              className="btn-primary flex items-center"
              onClick={() => setShowAddVehicleModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Vehicle
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-border p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    id="search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Search by license plate, model, or driver"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-48">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select 
                  id="status"
                  className="w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
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
          <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      License Plate
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fuel Level
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredVehicles.length > 0 ? (
                    filteredVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {vehicle.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.licensePlate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.model}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(vehicle.status)}`}>
                            {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.lastService}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.driver}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  vehicle.fuelLevel > 70 ? 'bg-green-500' : 
                                  vehicle.fuelLevel > 30 ? 'bg-amber-500' : 'bg-red-500'
                                }`} 
                                style={{ width: `${vehicle.fuelLevel}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs text-gray-500">{vehicle.fuelLevel}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button 
                            className="text-primary hover:text-primary-dark mr-3"
                            onClick={() => alert(`Edit functionality for vehicle ${vehicle.id} coming soon!`)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete vehicle ${vehicle.id}?`)) {
                                setVehicles(vehicles.filter(v => v.id !== vehicle.id));
                              }
                            }}
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
                      <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
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
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Fleet Summary</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Vehicles</p>
                  <p className="text-2xl font-medium">{vehicles.length}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Active</p>
                    <p className="text-xl font-medium text-green-600">
                      {vehicles.filter(v => v.status === 'active').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Idle</p>
                    <p className="text-xl font-medium text-blue-600">
                      {vehicles.filter(v => v.status === 'idle').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Maintenance</p>
                    <p className="text-xl font-medium text-amber-600">
                      {vehicles.filter(v => v.status === 'maintenance').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
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
                  <p className="text-sm text-muted-foreground">No upcoming services</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
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
                  <p className="text-sm text-muted-foreground">No vehicles with low fuel</p>
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