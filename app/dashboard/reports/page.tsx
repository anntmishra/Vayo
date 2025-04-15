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
    const driverScores = Array.from({ length: Math.min(10, truckCount) }, (_, i) => ({
      name: `Driver ${i + 1}`,
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!user || !reportData) {
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
            <Link href="/dashboard/fleet" className="text-secondary hover:text-primary transition-colors">Fleet</Link>
            <Link href="/dashboard/reports" className="text-primary font-medium">Reports</Link>
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
            <h1 className="text-3xl font-bold">Performance Reports</h1>
            <div className="flex bg-white border border-border rounded-lg overflow-hidden">
              <button 
                className={`px-4 py-2 text-sm font-medium ${reportTimeframe === 'week' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                onClick={() => setReportTimeframe('week')}
              >
                Week
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${reportTimeframe === 'month' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                onClick={() => setReportTimeframe('month')}
              >
                Month
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${reportTimeframe === 'quarter' ? 'bg-primary text-white' : 'hover:bg-gray-50'}`}
                onClick={() => setReportTimeframe('quarter')}
              >
                Quarter
              </button>
            </div>
          </div>

          {/* KPI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { 
                title: 'Total Distance', 
                value: `${Math.round(reportData.dailyDistance.reduce((sum, val) => sum + val, 0))} km`,
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                  </svg>
                ),
                color: 'bg-blue-100 text-blue-600'
              },
              { 
                title: 'Fuel Used', 
                value: `${Math.round(reportData.fuelConsumption.reduce((sum, val) => sum + val, 0))} L`,
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                  </svg>
                ),
                color: 'bg-green-100 text-green-600'
              },
              { 
                title: 'Total Cost', 
                value: formatCurrency(reportData.costBreakdown.reduce((sum, item) => sum + item.value, 0)),
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                  </svg>
                ),
                color: 'bg-amber-100 text-amber-600'
              },
              { 
                title: 'CO2 Emissions', 
                value: `${Math.round(reportData.emissions.reduce((sum, val) => sum + val, 0) / 1000)} tons`,
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                  </svg>
                ),
                color: 'bg-red-100 text-red-600'
              }
            ].map((kpi, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-border p-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${kpi.color} flex items-center justify-center`}>
                    {kpi.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-semibold">{kpi.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Daily Distance</h2>
              {renderBarChart(reportData.dailyDistance, 'Kilometers', 'bg-blue-500')}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Fuel Consumption</h2>
              {renderBarChart(reportData.fuelConsumption, 'Liters', 'bg-green-500')}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Driver Performance Scores</h2>
              {renderHorizontalBarChart(reportData.driverScores)}
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-lg font-semibold mb-4">Cost Breakdown</h2>
              {renderPieChart(reportData.costBreakdown)}
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex justify-end mt-8 gap-4">
            <button className="btn-outline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Export PDF
            </button>
            <button className="btn-outline flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 