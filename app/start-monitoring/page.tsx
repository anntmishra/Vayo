'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StartMonitoring() {
  const router = useRouter();

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  // Next steps with their respective paths
  const nextSteps = [
    { name: 'Add your first vehicle', path: '/dashboard/add-vehicle' },
    { name: 'Add drivers to your fleet', path: '/dashboard/add-driver' },
    { name: 'Set up team access', path: '/dashboard/team-access' },
    { name: 'Configure alerts', path: '/dashboard/alerts' }
  ];

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
          <div className="text-center mb-10">
            <div className="inline-flex h-16 w-16 rounded-full bg-green-100 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-indigo-900">You're All Set!</h1>
            <p className="mt-2 text-lg text-indigo-600">Your fleet monitoring dashboard is ready to use</p>
          </div>

          {/* Empty Fleet Dashboard Preview */}
          <div className="bg-indigo-50 p-6 rounded-lg mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { label: 'Active Vehicles', value: '0', change: 'Add vehicles to start' },
                { label: 'Total Distance', value: '0 km', change: 'Start tracking' },
                { label: 'Fuel Efficiency', value: '0%', change: 'Monitor usage' },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                  <div className="text-sm text-indigo-600">{stat.label}</div>
                  <div className="text-2xl font-bold text-indigo-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-indigo-500">{stat.change}</div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-4 text-indigo-900">Next Steps</h3>
              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <Link href={step.path} key={index}>
                    <div className="flex items-center text-indigo-700 p-3 rounded-lg border border-transparent hover:border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center mr-3 text-sm font-medium text-indigo-600">
                        {index + 1}
                      </div>
                      {step.name}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-auto text-indigo-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleGoToDashboard}
              className="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-md hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
              Go to Dashboard
            </button>
            <button className="py-3 px-6 border border-indigo-300 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all">
              Watch Tutorial
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-indigo-900 mb-3">Need Help?</h3>
          <p className="text-indigo-700 mb-6 max-w-2xl mx-auto">
            Our support team is available 24/7 to help you get started with your fleet monitoring.
          </p>
          <Link href="/contact" className="py-2 px-5 border border-indigo-300 text-indigo-600 font-medium rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all inline-block">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
} 