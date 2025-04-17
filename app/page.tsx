import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      {/* Navigation */}
      <header className="py-4 border-b border-indigo-100 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Vayo</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-indigo-900 hover:text-indigo-600 transition-colors">Features</a>
            <Link href="/solutions" className="text-indigo-900 hover:text-indigo-600 transition-colors">Solutions</Link>
            <Link href="/pricing" className="text-indigo-900 hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link href="/about" className="text-indigo-900 hover:text-indigo-600 transition-colors">About</Link>
            <Link href="/contact" className="text-indigo-900 hover:text-indigo-600 transition-colors">Contact</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Login
            </Link>
            <Link href="/demo" className="text-purple-600 hover:text-purple-800 transition-colors">
              Try Demo
            </Link>
            <Link href="/get-started" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md hover:from-indigo-700 hover:to-purple-700 transition-all">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 leading-tight mb-6">
                Smart Telematics for Modern Road Transport
              </h1>
              <p className="text-lg text-indigo-700 mb-8">
                Vayo provides advanced telematics solutions to optimize your fleet operations, 
                improve safety, and reduce costs across your transport network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/demo" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all">
                  Try Demo
                </Link>
                <Link href="/contact" className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-8 rounded-lg transition-colors">
                  Request Demo
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 z-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-indigo-900">Vayo Dashboard</h3>
                    <p className="text-indigo-700 mb-4">Real-time fleet monitoring and analytics</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2 rounded">
                        <div className="font-medium text-indigo-900">Active Vehicles</div>
                        <div className="text-indigo-600 font-bold">243</div>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-2 rounded">
                        <div className="font-medium text-indigo-900">Fuel Efficiency</div>
                        <div className="text-indigo-600 font-bold">+12.4%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Advanced Telematics Features</h2>
              <p className="text-indigo-700 max-w-3xl mx-auto">
                Our platform offers comprehensive solutions designed to transform your transport network operations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-time Tracking",
                  description: "Monitor your fleet in real-time with precise GPS location and status updates.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  )
                },
                {
                  title: "Predictive Maintenance",
                  description: "Anticipate vehicle maintenance needs based on advanced analytics and sensor data.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
                    </svg>
                  )
                },
                {
                  title: "Fuel Management",
                  description: "Optimize fuel consumption with detailed analytics and route optimization.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>
                  )
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-indigo-100 hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-indigo-900">{feature.title}</h3>
                  <p className="text-indigo-700">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link href="/solutions" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-3 px-8 rounded-lg transition-colors inline-block">
                View All Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-100 to-purple-100">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl text-white p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your transport operations?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join hundreds of transport companies already using Vayo to optimize their fleet operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="bg-white text-indigo-600 hover:bg-indigo-50 py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all inline-block">
                  Start Your Free Trial
                </Link>
                <Link href="/pricing" className="bg-indigo-500 text-white hover:bg-indigo-600 py-3 px-8 rounded-lg transition-colors inline-block">
                  View Pricing
                </Link>
                <Link href="/contact" className="bg-indigo-700 text-white hover:bg-indigo-800 py-3 px-8 rounded-lg transition-colors inline-block">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white py-12 mt-auto">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Vayo</h3>
              <p className="text-indigo-200">
                Advanced telematics solutions for modern road transport networks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-indigo-200 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/pricing" className="text-indigo-200 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/contact" className="text-indigo-200 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/about" className="text-indigo-200 hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Fleet Management</Link></li>
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Driver Safety</Link></li>
                <li><Link href="/solutions" className="text-indigo-200 hover:text-white transition-colors">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-indigo-200">info@vayo.com</li>
                <li className="text-indigo-200">+1 (555) 123-4567</li>
                <li className="text-indigo-200">Bennett University, Greater Noida</li>
                <li><Link href="/contact" className="text-indigo-200 hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center">
            <p className="text-indigo-300">© {new Date().getFullYear()} Vayo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
