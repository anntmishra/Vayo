import Link from 'next/link';

export default function ConfigureFleet() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-2xl mx-auto">
          <Link href="/create-account" className="text-primary hover:text-primary-dark inline-flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Account Creation
          </Link>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Configure Your Fleet</h1>
            
            <div className="space-y-6">
              {/* Fleet Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fleet Size</label>
                <div className="grid grid-cols-3 gap-4">
                  {['1-10', '11-50', '50+'].map((size) => (
                    <button
                      key={size}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <div className="text-lg font-semibold">{size}</div>
                      <div className="text-sm text-gray-500">vehicles</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Types</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'Heavy Trucks',
                    'Light Commercial',
                    'Vans',
                    'Special Equipment'
                  ].map((type) => (
                    <label
                      key={type}
                      className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-primary cursor-pointer"
                    >
                      <input type="checkbox" className="mr-3" />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tracking Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Features</label>
                <div className="space-y-3">
                  {[
                    'Real-time GPS Tracking',
                    'Fuel Monitoring',
                    'Driver Behavior Analysis',
                    'Maintenance Scheduling',
                    'Route Optimization'
                  ].map((feature) => (
                    <label
                      key={feature}
                      className="flex items-center hover:bg-gray-50 p-2 rounded"
                    >
                      <input type="checkbox" className="mr-3" />
                      <span>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Link 
                href="/start-monitoring" 
                className="w-full btn-primary text-center mt-8 inline-block"
              >
                Save & Continue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 