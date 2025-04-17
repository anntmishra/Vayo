'use client';

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface TeamMemberForm {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role: string;
  phoneNumber: string;
}

export default function TeamAccess() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<TeamMemberForm>({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    role: 'viewer',
    phoneNumber: ''
  });
  
  const roles = [
    { id: 'admin', name: 'Administrator', description: 'Full access to all features' },
    { id: 'manager', name: 'Fleet Manager', description: 'Can manage vehicles, drivers, and view all data' },
    { id: 'viewer', name: 'Team Member', description: 'View-only access to data and reports' }
  ];
  
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-indigo-900">Add Team Member</h1>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
                <h2 className="text-md font-medium text-indigo-900 mb-2">Team Access Management</h2>
                <p className="text-sm text-indigo-700">
                  Add team members to your fleet management system with appropriate access levels. Each team member will receive an email invitation to join.
                </p>
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
                    <label htmlFor="email" className="block text-sm font-medium text-indigo-800">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-indigo-800">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-indigo-800">
                      Position/Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="position"
                      id="position"
                      required
                      value={formData.position}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-indigo-800">
                      Access Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-indigo-200 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Role description */}
                <div className="mt-2 bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-800">
                    {roles.find(r => r.id === formData.role)?.name} Access
                  </h3>
                  <p className="text-sm text-indigo-600 mt-1">
                    {roles.find(r => r.id === formData.role)?.description}
                  </p>
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
                      {isSubmitting ? 'Sending Invitation...' : 'Send Invitation'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-lg font-medium text-indigo-900 mb-4">Current Team Members</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-indigo-100">
              <div className="p-4 text-center text-indigo-500">
                <p>No team members added yet.</p>
                <p className="text-sm">Team members you add will appear here.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 