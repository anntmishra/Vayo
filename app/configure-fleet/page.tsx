'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ConfigureFleet() {
  const router = useRouter();
  const [fleetSize, setFleetSize] = useState<number>(1);
  const [vehicleTypes, setVehicleTypes] = useState<{ [key: string]: boolean }>({
    'Heavy Trucks': false,
    'Light Commercial': false,
    'Vans': false,
    'Special Equipment': false
  });
  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    'Real-time GPS Tracking': true,
    'Fuel Monitoring': false,
    'Driver Behavior Analysis': false,
    'Maintenance Scheduling': false,
    'Route Optimization': false
  });
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('monthly');
  const [showPricing, setShowPricing] = useState<boolean>(false);

  // Base prices
  const basePrices = {
    standard: {
      monthly: 2074,
      annually: 1659,
    },
    premium: {
      monthly: 4149,
      annually: 3319,
    }
  };

  useEffect(() => {
    // Check if fleet size is greater than 5 to show pricing
    setShowPricing(fleetSize > 5);
  }, [fleetSize]);

  // Calculate price based on truck count
  const calculatePrice = (basePrice: number) => {
    if (fleetSize <= 5) return 0; // Free tier
    
    // Cost per truck above 5
    const additionalTrucks = fleetSize - 5;
    const costPerTruck = billingCycle === 'monthly' ? 331 : 248;
    
    return basePrice + (additionalTrucks * costPerTruck);
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleVehicleTypeChange = (type: string) => {
    setVehicleTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleFeatureChange = (feature: string) => {
    setFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const handleFleetSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setFleetSize(value);
    }
  };

  const handleContinue = () => {
    // In a real app, we'd save this configuration to a database or state
    // For now, we'll just navigate to the next page
    router.push('/start-monitoring');
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
              <nav className="ml-6 hidden md:flex items-center space-x-8">
                <Link href="/" className="text-indigo-900 hover:text-indigo-600 transition-colors">Home</Link>
                <Link href="/about" className="text-indigo-900 hover:text-indigo-600 transition-colors">About</Link>
                <Link href="/solutions" className="text-indigo-900 hover:text-indigo-600 transition-colors">Solutions</Link>
                <Link href="/contact" className="text-indigo-900 hover:text-indigo-600 transition-colors">Contact</Link>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-md border border-indigo-100">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 rounded-full bg-indigo-100 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-indigo-900">Configure Your Fleet</h1>
            <p className="mt-2 text-lg text-indigo-600">Tell us about your vehicles and tracking needs</p>
          </div>
            
          <div className="space-y-8">
            {/* Fleet Size Selection */}
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-3">Fleet Size</label>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <input
                    type="number"
                    min="1"
                    value={fleetSize}
                    onChange={handleFleetSizeChange}
                    className="w-full px-4 py-2 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    placeholder="Enter number of vehicles"
                  />
                </div>
                {fleetSize <= 5 ? (
                  <p className="text-sm text-green-600 font-medium">
                    Free tier! Up to 5 vehicles at no cost.
                  </p>
                ) : (
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <div className="mb-3">
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
                    
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-lg border border-indigo-100 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-indigo-900">Standard Plan</p>
                          <p className="text-sm text-indigo-600">Basic features for your fleet</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-indigo-700">
                            {formatCurrency(calculatePrice(basePrices.standard[billingCycle]))}
                            <span className="text-sm font-normal">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-indigo-100 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-indigo-900">Premium Plan</p>
                          <p className="text-sm text-indigo-600">Advanced features for your fleet</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-indigo-700">
                            {formatCurrency(calculatePrice(basePrices.premium[billingCycle]))}
                            <span className="text-sm font-normal">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-xs text-indigo-600 italic">
                        * Pricing includes base price plus {formatCurrency(billingCycle === 'monthly' ? 331 : 248)} per vehicle above 5
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Types */}
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-3">Vehicle Types</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.keys(vehicleTypes).map((type) => (
                  <label
                    key={type}
                    className={`flex items-center p-4 border ${vehicleTypes[type] ? 'bg-indigo-50 border-indigo-500' : 'border-indigo-200'} rounded-lg cursor-pointer hover:border-indigo-500 transition-colors`}
                  >
                    <input 
                      type="checkbox" 
                      checked={vehicleTypes[type]} 
                      onChange={() => handleVehicleTypeChange(type)}
                      className="h-4 w-4 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-500" 
                    />
                    <span className="ml-3 text-indigo-900">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Tracking Features */}
            <div>
              <label className="block text-sm font-medium text-indigo-700 mb-3">Required Features</label>
              <div className="space-y-3">
                {Object.keys(features).map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center p-3 rounded-md hover:bg-indigo-50 transition-colors cursor-pointer"
                  >
                    <input 
                      type="checkbox" 
                      checked={features[feature]} 
                      onChange={() => handleFeatureChange(feature)}
                      className="h-4 w-4 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-500" 
                    />
                    <span className="ml-3 text-indigo-900">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={handleContinue}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all mt-8"
            >
              Continue to Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 