'use client';
import Link from 'next/link';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '../lib/auth';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  submit?: string;
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Use the local storage auth instead of API
        loginUser(formData.email.trim().toLowerCase(), formData.password);
        
        // Login successful - redirect to dashboard
        router.push('/dashboard');
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: error instanceof Error ? error.message : 'Invalid email or password'
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
          <Link href="/" className="text-indigo-600 hover:text-indigo-800 inline-flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </Link>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-indigo-100">
            <h1 className="text-2xl font-bold text-indigo-900 mb-6">Sign In to Vayo</h1>
            
            {errors.submit && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-700 mb-1">
                  Email Address
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
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-indigo-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-800">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 ${
                    errors.password ? 'border-red-500' : 'border-indigo-200'
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 border-indigo-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-indigo-700">
                  Remember me
                </label>
              </div>

              <button 
                type="submit"
                className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-indigo-100">
              <p className="text-sm text-center text-indigo-700">
                Don't have an account?{' '}
                <Link href="/create-account" className="text-indigo-600 hover:text-indigo-800 font-medium">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 