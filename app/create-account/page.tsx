'use client';
import Link from 'next/link';
import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { registerUser, isLoggedIn } from '../lib/auth';

interface FormData {
  company: string;
  email: string;
  password: string;
  phone: string;
  truckCount: string;
}

interface FormErrors {
  company?: string;
  email?: string;
  password?: string;
  phone?: string;
  truckCount?: string;
  submit?: string;
}

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    company: '',
    email: '',
    password: '',
    phone: '',
    truckCount: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoginStatus = async () => {
      if (await isLoggedIn()) {
        router.push('/dashboard');
      }
    };
    
    checkLoginStatus();
  }, [router]);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.truckCount) newErrors.truckCount = 'Number of trucks is required';
    else if (parseInt(formData.truckCount) < 0) newErrors.truckCount = 'Invalid number of trucks';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const formPayload = {
          company: formData.company.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone.trim(),
          truckCount: parseInt(formData.truckCount)
        };

        // Use Firebase authentication with additional user data
        await registerUser(
          formPayload.email, 
          formPayload.password, 
          formPayload.company
        );

        // Store additional data in localStorage for demo purposes
        // In a real app, this would be stored in Firestore
        localStorage.setItem('vayo_user_data', JSON.stringify({
          company: formPayload.company,
          phone: formPayload.phone,
          truckCount: formPayload.truckCount
        }, null, 2));

        // Registration successful
        router.push('/configure-fleet');
      } catch (error: any) {
        console.error('Registration error details:', error);
        // Display more detailed error message for debugging
        let errorMessage = 'Failed to create account';
        if (error.code) {
          errorMessage = `Error (${error.code}): ${error.message}`;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }
        
        setErrors(prev => ({
          ...prev,
          submit: errorMessage
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto">
          <Link href="/get-started" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Get Started
          </Link>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-indigo-100">
            <h1 className="text-2xl font-bold text-indigo-900 mb-6">Create Your Account</h1>
            
            {errors.submit && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-indigo-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 ${
                    errors.company ? 'border-red-500' : 'border-indigo-200'
                  }`}
                  placeholder="Enter your company name"
                  disabled={isLoading}
                />
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 ${
                    errors.email ? 'border-red-500' : 'border-indigo-200'
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-indigo-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 ${
                    errors.password ? 'border-red-500' : 'border-indigo-200'
                  }`}
                  placeholder="Create a password"
                  disabled={isLoading}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-indigo-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 ${
                    errors.phone ? 'border-red-500' : 'border-indigo-200'
                  }`}
                  placeholder="Enter your phone number"
                  disabled={isLoading}
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="truckCount" className="block text-sm font-medium text-indigo-700 mb-1">
                  Number of Trucks <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="truckCount"
                  name="truckCount"
                  value={formData.truckCount}
                  onChange={handleChange}
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 ${
                    errors.truckCount ? 'border-red-500' : 'border-indigo-200'
                  }`}
                  placeholder="Enter number of trucks"
                  disabled={isLoading}
                />
                {errors.truckCount && <p className="text-red-500 text-sm mt-1">{errors.truckCount}</p>}
                <p className="text-sm text-indigo-500 mt-1">Free for up to 5 trucks</p>
              </div>

              <button 
                type="submit"
                className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all mt-6 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account & Continue'}
              </button>
            </form>

            <p className="mt-6 pt-6 border-t border-indigo-100 text-sm text-center text-indigo-700">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Sign in
              </Link>
            </p>
            
            <p className="mt-3 text-sm text-center text-indigo-700">
              Want to see how it works first?{' '}
              <Link href="/demo" className="text-indigo-600 hover:text-indigo-800 font-medium">
                Try our demo
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 