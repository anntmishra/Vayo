'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AlertConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
  recipients: string[];
}

export default function Alerts() {
  const router = useRouter();
  const [emailInput, setEmailInput] = useState('');
  const [recipients, setRecipients] = useState<string[]>([]);
  
  // Default alert configurations
  const [alertConfigs, setAlertConfigs] = useState<AlertConfig[]>([
    {
      id: 'speeding',
      name: 'Speeding Alert',
      description: 'Notify when vehicles exceed speed limit',
      enabled: true,
      threshold: 80,
      recipients: []
    },
    {
      id: 'fuel',
      name: 'Fuel Level Alert',
      description: 'Notify when fuel level drops below threshold',
      enabled: false,
      threshold: 20,
      recipients: []
    },
    {
      id: 'maintenance',
      name: 'Maintenance Due Alert',
      description: 'Notify when vehicle is due for maintenance',
      enabled: true,
      recipients: []
    },
    {
      id: 'geofence',
      name: 'Geofence Alert',
      description: 'Notify when vehicles enter or exit defined areas',
      enabled: false,
      recipients: []
    },
    {
      id: 'idling',
      name: 'Excessive Idling Alert',
      description: 'Notify when vehicles idle for too long',
      enabled: false,
      threshold: 10,
      recipients: []
    }
  ]);
  
  const handleToggleAlert = (id: string) => {
    setAlertConfigs(prev => 
      prev.map(config => 
        config.id === id 
          ? { ...config, enabled: !config.enabled } 
          : config
      )
    );
  };
  
  const handleThresholdChange = (id: string, value: number) => {
    setAlertConfigs(prev => 
      prev.map(config => 
        config.id === id 
          ? { ...config, threshold: value } 
          : config
      )
    );
  };
  
  const handleAddRecipient = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && !recipients.includes(emailInput)) {
      setRecipients(prev => [...prev, emailInput]);
      setEmailInput('');
    }
  };
  
  const handleRemoveRecipient = (email: string) => {
    setRecipients(prev => prev.filter(r => r !== email));
  };
  
  const handleSaveSettings = () => {
    // Update all alert configs with the current recipients
    const updatedConfigs = alertConfigs.map(config => ({
      ...config,
      recipients: recipients
    }));
    
    // In a real app, we would save this to a database
    setAlertConfigs(updatedConfigs);
    
    // Navigate back to dashboard
    router.push('/dashboard');
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
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-indigo-900">Configure Alerts</h1>
          </div>
          
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-6">
            <p className="text-indigo-700">
              Configure alerts to stay informed about important events in your fleet. Alerts can be sent via email or SMS.
            </p>
          </div>
          
          {/* Alert Recipients */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-indigo-900 mb-4">Alert Recipients</h2>
              <p className="text-sm text-indigo-700 mb-4">
                Add email addresses that should receive all enabled alerts
              </p>
              
              <form onSubmit={handleAddRecipient} className="flex gap-2 mb-4">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email address"
                  className="flex-grow px-3 py-2 border border-indigo-200 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </form>
              
              <div className="space-y-2">
                {recipients.length === 0 ? (
                  <p className="text-indigo-400 text-sm">No recipients added yet</p>
                ) : (
                  recipients.map((email, index) => (
                    <div key={index} className="flex justify-between items-center bg-indigo-50 p-2 rounded-md">
                      <span className="text-indigo-800">{email}</span>
                      <button
                        onClick={() => handleRemoveRecipient(email)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          
          {/* Alert Configurations */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-indigo-900 mb-4">Alert Settings</h2>
              
              <div className="space-y-6">
                {alertConfigs.map((alert) => (
                  <div key={alert.id} className="border border-indigo-100 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-indigo-900">{alert.name}</h3>
                        <p className="text-sm text-indigo-600">{alert.description}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm text-indigo-700">
                          {alert.enabled ? 'Enabled' : 'Disabled'}
                        </span>
                        <button
                          onClick={() => handleToggleAlert(alert.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            alert.enabled ? 'bg-indigo-600' : 'bg-gray-300'
                          } transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              alert.enabled ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                          />
                        </button>
                      </div>
                    </div>
                    
                    {alert.threshold !== undefined && alert.enabled && (
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-indigo-700 mb-1">
                          Threshold: {alert.threshold} {alert.id === 'speeding' ? 'km/h' : 
                                       alert.id === 'fuel' ? '%' : 
                                       alert.id === 'idling' ? 'minutes' : ''}
                        </label>
                        <input
                          type="range"
                          min={alert.id === 'speeding' ? 40 : alert.id === 'fuel' ? 5 : 1}
                          max={alert.id === 'speeding' ? 120 : alert.id === 'fuel' ? 30 : 30}
                          value={alert.threshold}
                          onChange={(e) => handleThresholdChange(alert.id, parseInt(e.target.value))}
                          className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-indigo-600 mt-1">
                          <span>{alert.id === 'speeding' ? '40 km/h' : 
                                 alert.id === 'fuel' ? '5%' : 
                                 alert.id === 'idling' ? '1 min' : ''}</span>
                          <span>{alert.id === 'speeding' ? '120 km/h' : 
                                 alert.id === 'fuel' ? '30%' : 
                                 alert.id === 'idling' ? '30 min' : ''}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save Alert Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 