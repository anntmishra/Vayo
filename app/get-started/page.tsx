import Link from 'next/link';

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Get Started with Vayo
          </h1>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Create Your Account
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Set up your Vayo account to access our full suite of telematics solutions.
                  </p>
                  <Link href="/create-account" className="btn-primary inline-block">
                    Create Account
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Configure Your Fleet
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Add your vehicles and customize tracking parameters to match your needs.
                  </p>
                  <Link href="/configure-fleet" className="btn-outline inline-block">
                    Configure Fleet
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Monitoring
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Access real-time data and insights about your fleet's performance.
                  </p>
                  <Link href="/start-monitoring" className="btn-outline inline-block">
                    View Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-primary/5 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              Our support team is available 24/7 to help you get started with Vayo.
            </p>
            <button className="btn-primary">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 