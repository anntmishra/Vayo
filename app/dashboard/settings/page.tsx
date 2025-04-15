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

export default function Settings() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('account');
  
  // Form states
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState({
    dailyReports: true,
    alerts: true,
    maintenanceReminders: true,
    newsUpdates: false
  });
  
  // App settings
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [unitSystem, setUnitSystem] = useState('metric');
  const [timezone, setTimezone] = useState('UTC');
  
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          
          // Initialize form with user data
          setCompanyName(data.user.company);
          setEmail(data.user.email);
          setPhone(''); // Assuming phone isn't returned from API
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

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert('Account details updated successfully');
    }, 500);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Simulate API call
    setTimeout(() => {
      alert('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 500);
  };

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert('Notification preferences updated successfully');
    }, 500);
  };

  const handleAppSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      alert('Application settings updated successfully');
    }, 500);
  };

  const handleLogout = () => {
    // Log out and redirect to login page
    fetch('/api/auth/logout', { method: 'POST' })
      .then(() => {
        router.push('/login');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
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
            <Link href="/dashboard/reports" className="text-secondary hover:text-primary transition-colors">Reports</Link>
            <Link href="/dashboard/settings" className="text-primary font-medium">Settings</Link>
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
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-16 w-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-medium">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-semibold">{user.company}</h2>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">{user.role}</p>
                    </div>
                  </div>
                  
                  <nav className="space-y-1">
                    <button 
                      onClick={() => setActiveTab('account')} 
                      className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${
                        activeTab === 'account' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      Account
                    </button>
                    <button 
                      onClick={() => setActiveTab('password')} 
                      className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${
                        activeTab === 'password' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                      Password
                    </button>
                    <button 
                      onClick={() => setActiveTab('notifications')} 
                      className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${
                        activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                      </svg>
                      Notifications
                    </button>
                    <button 
                      onClick={() => setActiveTab('app')} 
                      className={`flex items-center gap-3 w-full p-3 rounded-lg text-left ${
                        activeTab === 'app' ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted/50'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      App Settings
                    </button>
                  </nav>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full p-3 rounded-lg text-left text-red-600 hover:bg-red-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-white rounded-xl shadow-sm border border-border">
                <div className="p-6">
                  {/* Account Settings Form */}
                  {activeTab === 'account' && (
                    <>
                      <h2 className="text-xl font-semibold mb-6">Account Information</h2>
                      <form onSubmit={handleAccountSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            id="company"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subscription
                          </label>
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{user.isPremium ? 'Premium Plan' : 'Standard Plan'}</p>
                                <p className="text-sm text-muted-foreground">{user.truckCount} vehicles</p>
                              </div>
                              <button type="button" className="btn-outline text-sm">
                                {user.isPremium ? 'Manage Plan' : 'Upgrade'}
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button type="submit" className="btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  {/* Password Form */}
                  {activeTab === 'password' && (
                    <>
                      <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                          />
                        </div>
                        
                        <div className="pt-4">
                          <button type="submit" className="btn-primary">
                            Update Password
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  {/* Notification Settings */}
                  {activeTab === 'notifications' && (
                    <>
                      <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>
                      <form onSubmit={handleNotificationSubmit} className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-3">Email Notifications</p>
                          
                          <div className="space-y-3">
                            {[
                              { id: 'dailyReports', label: 'Daily Activity Reports' },
                              { id: 'alerts', label: 'Real-time Vehicle Alerts' },
                              { id: 'maintenanceReminders', label: 'Maintenance Reminders' },
                              { id: 'newsUpdates', label: 'News and Feature Updates' }
                            ].map((item) => (
                              <div key={item.id} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={item.id}
                                  checked={emailNotifications[item.id as keyof typeof emailNotifications]}
                                  onChange={(e) => setEmailNotifications({
                                    ...emailNotifications,
                                    [item.id]: e.target.checked
                                  })}
                                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                                />
                                <label htmlFor={item.id} className="ml-2 block text-sm text-gray-700">
                                  {item.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <button type="submit" className="btn-primary">
                            Save Preferences
                          </button>
                        </div>
                      </form>
                    </>
                  )}

                  {/* App Settings */}
                  {activeTab === 'app' && (
                    <>
                      <h2 className="text-xl font-semibold mb-6">Application Settings</h2>
                      <form onSubmit={handleAppSettingsSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-1">
                            Theme
                          </label>
                          <select
                            id="theme"
                            value={theme}
                            onChange={(e) => setTheme(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="system">System</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                            Language
                          </label>
                          <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="en">English</option>
                            <option value="es">Spanish</option>
                            <option value="fr">French</option>
                            <option value="de">German</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="unitSystem" className="block text-sm font-medium text-gray-700 mb-1">
                            Unit System
                          </label>
                          <select
                            id="unitSystem"
                            value={unitSystem}
                            onChange={(e) => setUnitSystem(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="metric">Metric (km, L)</option>
                            <option value="imperial">Imperial (mi, gal)</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                            Timezone
                          </label>
                          <select
                            id="timezone"
                            value={timezone}
                            onChange={(e) => setTimezone(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time (ET)</option>
                            <option value="America/Chicago">Central Time (CT)</option>
                            <option value="America/Denver">Mountain Time (MT)</option>
                            <option value="America/Los_Angeles">Pacific Time (PT)</option>
                            <option value="Europe/London">London (GMT)</option>
                            <option value="Europe/Paris">Paris (CET)</option>
                          </select>
                        </div>
                        
                        <div className="pt-4">
                          <button type="submit" className="btn-primary">
                            Save Settings
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 