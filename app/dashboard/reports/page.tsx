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

interface ReportData {
  dailyDistance: number[];
  fuelConsumption: number[];
  driverScores: {name: string; score: number}[];
  costBreakdown: {category: string; value: number}[];
  emissions: number[];
}

export default function Reports() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportTimeframe, setReportTimeframe] = useState('week');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          
          // Generate mock report data
          generateMockReportData(data.user.truckCount);
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

  useEffect(() => {
    if (user) {
      generateMockReportData(user.truckCount);
    }
  }, [reportTimeframe, user]);

  const generateMockReportData = (truckCount: number) => {
    let days = reportTimeframe === 'week' ? 7 : reportTimeframe === 'month' ? 30 : 90;
    
    // Generate daily distance data
    const dailyDistance = Array.from({ length: days }, () => 
      (50 + Math.random() * 30) * truckCount
    );
    
    // Generate fuel consumption data
    const fuelConsumption = Array.from({ length: days }, () => 
      (15 + Math.random() * 8) * truckCount
    );
    
    // Generate driver scores
    const indianNames = ['Vikram Singh', 'Priya Mehta', 'Rahul Kumar', 'Ananya Patel', 'Raj Sharma', 'Neha Verma', 'Arjun Reddy', 'Deepika Gupta', 'Suresh Iyer', 'Meena Kapoor'];
    const driverScores = Array.from({ length: Math.min(10, truckCount) }, (_, i) => ({
      name: indianNames[i],
      score: 60 + Math.floor(Math.random() * 40)
    })).sort((a, b) => b.score - a.score);
    
    // Generate cost breakdown
    const totalCost = 1000 * truckCount;
    const costBreakdown = [
      { category: 'Fuel', value: totalCost * (0.4 + Math.random() * 0.1) },
      { category: 'Maintenance', value: totalCost * (0.2 + Math.random() * 0.05) },
      { category: 'Insurance', value: totalCost * (0.15 + Math.random() * 0.05) },
      { category: 'Tolls', value: totalCost * (0.1 + Math.random() * 0.03) },
      { category: 'Other', value: totalCost * (0.05 + Math.random() * 0.02) }
    ];
    
    // Ensure total is exactly totalCost
    const currentTotal = costBreakdown.reduce((sum, item) => sum + item.value, 0);
    costBreakdown[0].value += (totalCost - currentTotal);
    
    // Generate emissions data
    const emissions = Array.from({ length: days }, () => 
      (80 + Math.random() * 20) * truckCount
    );
    
    setReportData({
      dailyDistance,
      fuelConsumption,
      driverScores,
      costBreakdown,
      emissions
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const renderBarChart = (data: number[], label: string, color: string) => {
    const max = Math.max(...data);
    
    return (
      <div className="space-y-2">
        <h3 className="text-sm font-medium">{label}</h3>
        <div className="flex items-end h-40 gap-1">
          {data.slice(0, 14).map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1 min-w-0">
              <div 
                className={`w-full ${color} rounded-t`}
                style={{ height: `${(value / max) * 100}%` }}
              ></div>
              {reportTimeframe === 'week' && (
                <span className="text-xs mt-1 text-gray-500">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index % 7]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderHorizontalBarChart = (data: {name: string; score: number}[]) => {
    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span className="font-medium">{item.score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${
                  item.score > 85 ? 'bg-green-500' : 
                  item.score > 70 ? 'bg-blue-500' : 
                  item.score > 60 ? 'bg-amber-500' : 'bg-red-500'
                }`} 
                style={{ width: `${item.score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderPieChart = (data: {category: string; value: number}[]) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    const colors = [
      'fill-blue-500', 'fill-green-500', 'fill-amber-500', 
      'fill-red-500', 'fill-purple-500', 'fill-pink-500'
    ];

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angleSize = (percentage / 100) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angleSize;
              currentAngle = endAngle;

              // Calculate SVG arc path
              const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
              const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
              const largeArcFlag = angleSize > 180 ? 1 : 0;

              const pathData = `
                M 50 50
                L ${x1} ${y1}
                A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z
              `;

              return (
                <path
                  key={index}
                  d={pathData}
                  className={colors[index % colors.length]}
                />
              );
            })}
          </svg>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className={`w-3 h-3 rounded-full mr-2 bg-${colors[index % colors.length].split('-')[1]}-500`}></div>
              <span>{item.category}: {formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-indigo-700">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!user || !reportData) {
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
            <Link href="/dashboard/fleet" className="text-indigo-900 hover:text-indigo-600 transition-colors">Fleet</Link>
            <Link href="/dashboard/reports" className="text-indigo-600 font-medium">Reports</Link>
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
            <h1 className="text-3xl font-bold text-indigo-900">Reports & Analytics</h1>
            
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setReportTimeframe('week')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  reportTimeframe === 'week' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-indigo-700 hover:bg-indigo-50'
                } border border-indigo-200`}
              >
                Weekly
              </button>
              <button
                onClick={() => setReportTimeframe('month')}
                className={`px-4 py-2 text-sm font-medium ${
                  reportTimeframe === 'month' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-indigo-700 hover:bg-indigo-50'
                } border-t border-b border-indigo-200`}
              >
                Monthly
              </button>
              <button
                onClick={() => setReportTimeframe('quarter')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  reportTimeframe === 'quarter' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-indigo-700 hover:bg-indigo-50'
                } border border-indigo-200`}
              >
                Quarterly
              </button>
            </div>
          </div>
          
          {/* Distance & Fuel Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              {renderBarChart(reportData.dailyDistance, 'Daily Distance (km)', 'bg-indigo-500')}
              <div className="mt-4 flex justify-between text-indigo-700">
                <div>
                  <span className="text-sm text-indigo-500">Avg. Distance:</span>
                  <p className="font-medium">{Math.round(reportData.dailyDistance.reduce((a, b) => a + b, 0) / reportData.dailyDistance.length)} km</p>
                </div>
                <div>
                  <span className="text-sm text-indigo-500">Total:</span>
                  <p className="font-medium">{Math.round(reportData.dailyDistance.reduce((a, b) => a + b, 0))} km</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              {renderBarChart(reportData.fuelConsumption, 'Fuel Consumption (L)', 'bg-purple-500')}
              <div className="mt-4 flex justify-between text-indigo-700">
                <div>
                  <span className="text-sm text-indigo-500">Avg. Fuel Usage:</span>
                  <p className="font-medium">{Math.round(reportData.fuelConsumption.reduce((a, b) => a + b, 0) / reportData.fuelConsumption.length)} L</p>
                </div>
                <div>
                  <span className="text-sm text-indigo-500">Total:</span>
                  <p className="font-medium">{Math.round(reportData.fuelConsumption.reduce((a, b) => a + b, 0))} L</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Driver Scores & Cost Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <h2 className="text-lg font-semibold mb-4 text-indigo-900">Driver Safety Scores</h2>
              {renderHorizontalBarChart(reportData.driverScores)}
              <div className="mt-4 flex justify-between text-indigo-700">
                <div>
                  <span className="text-sm text-indigo-500">Avg. Score:</span>
                  <p className="font-medium">{Math.round(reportData.driverScores.reduce((a, b) => a + b.score, 0) / reportData.driverScores.length)}</p>
                </div>
                <div>
                  <span className="text-sm text-indigo-500">Top Driver:</span>
                  <p className="font-medium">{reportData.driverScores[0].name}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <h2 className="text-lg font-semibold mb-4 text-indigo-900">Cost Breakdown</h2>
              {renderPieChart(reportData.costBreakdown)}
              <div className="mt-4 text-center text-indigo-700">
                <span className="text-sm text-indigo-500">Total Expenses:</span>
                <p className="font-medium">{formatCurrency(reportData.costBreakdown.reduce((a, b) => a + b.value, 0))}</p>
              </div>
            </div>
          </div>
          
          {/* Emissions & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              {renderBarChart(reportData.emissions, 'CO2 Emissions (kg)', 'bg-green-500')}
              <div className="mt-4 flex justify-between text-indigo-700">
                <div>
                  <span className="text-sm text-indigo-500">Avg. Emissions:</span>
                  <p className="font-medium">{Math.round(reportData.emissions.reduce((a, b) => a + b, 0) / reportData.emissions.length)} kg</p>
                </div>
                <div>
                  <span className="text-sm text-indigo-500">Total:</span>
                  <p className="font-medium">{Math.round(reportData.emissions.reduce((a, b) => a + b, 0))} kg</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-indigo-100 p-6">
              <h2 className="text-lg font-semibold mb-4 text-indigo-900">Performance Summary</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-indigo-500">Fuel Efficiency</span>
                    <span className="text-sm font-medium text-indigo-700">Good</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-indigo-500">Driver Safety</span>
                    <span className="text-sm font-medium text-indigo-700">Excellent</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-indigo-500">Vehicle Utilization</span>
                    <span className="text-sm font-medium text-indigo-700">Average</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-indigo-500">Cost Efficiency</span>
                    <span className="text-sm font-medium text-indigo-700">Good</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2.5">
                    <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
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