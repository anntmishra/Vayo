import Link from 'next/link';

export default function StartMonitoring() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/configure-fleet" className="text-primary hover:text-primary-dark inline-flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Fleet Configuration
          </Link>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h1>
              <p className="text-gray-600">Your fleet monitoring dashboard is ready to use.</p>
            </div>

            {/* Dashboard Preview */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Active Vehicles', value: '0', change: 'Add vehicles to start' },
                  { label: 'Total Distance', value: '0 km', change: 'Start tracking' },
                  { label: 'Fuel Efficiency', value: '0%', change: 'Monitor usage' },
                ].map((stat, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-600">{stat.label}</div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.change}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-4">Next Steps</h3>
                <div className="space-y-4">
                  {[
                    'Add your first vehicle',
                    'Install tracking devices',
                    'Set up monitoring parameters',
                    'Configure alerts',
                  ].map((step, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center mr-3 text-sm">
                        {index + 1}
                      </div>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Go to Dashboard
              </button>
              <button className="btn-outline">
                Watch Tutorial
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our support team is available 24/7 to help you get started.
            </p>
            <button className="btn-outline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 