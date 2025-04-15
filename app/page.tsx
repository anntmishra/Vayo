import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="py-4 border-b border-border sticky top-0 bg-white z-10">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Vayo</h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-secondary hover:text-primary transition-colors">Features</a>
            <a href="#solutions" className="text-secondary hover:text-primary transition-colors">Solutions</a>
            <a href="#about" className="text-secondary hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-secondary hover:text-primary transition-colors">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="btn-outline">
              Login
            </Link>
            <Link href="/get-started" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-muted">
          <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary leading-tight mb-6">
                Smart Telematics for Modern Road Transport
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Vayo provides advanced telematics solutions to optimize your fleet operations, 
                improve safety, and reduce costs across your transport network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary">Request Demo</button>
                <button className="btn-outline">Learn More</button>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 z-0"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4/5 h-4/5 bg-white rounded-lg shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Vayo Dashboard</h3>
                    <p className="text-muted-foreground mb-4">Real-time fleet monitoring and analytics</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-muted p-2 rounded">
                        <div className="font-medium">Active Vehicles</div>
                        <div className="text-primary font-bold">243</div>
                      </div>
                      <div className="bg-muted p-2 rounded">
                        <div className="font-medium">Fuel Efficiency</div>
                        <div className="text-primary font-bold">+12.4%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Telematics Features</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
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
                <div key={index} className="bg-white p-6 rounded-xl border border-border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-muted">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary to-accent rounded-xl text-white p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your transport operations?</h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join hundreds of transport companies already using Vayo to optimize their fleet operations.
              </p>
              <Link href="/get-started" className="bg-white text-primary hover:bg-white/90 font-medium py-3 px-8 rounded-lg transition-colors inline-block">
                Start Your Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 mt-auto">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Vayo</h3>
              <p className="text-white/70">
                Advanced telematics solutions for modern road transport networks.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">About</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Support</a></li>
                <li><a href="#" className="text-white/70 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-white/70">info@vayo.com</li>
                <li className="text-white/70">+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/50">© {new Date().getFullYear()} Vayo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
