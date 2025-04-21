'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, onAuthStateChanged, FirebaseUser } from './firebase';
import { User } from './auth';
import { setCookie, deleteCookie } from 'cookies-next';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      console.log('Setting up auth state listener');
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
        try {
          if (firebaseUser) {
            console.log('User authenticated:', firebaseUser.email);
            // User is signed in
            const userData: User = {
              email: firebaseUser.email || '',
              uid: firebaseUser.uid,
            };
            
            // Try to get additional user data from localStorage (for demo)
            const storedData = localStorage.getItem(`vayo_user_${firebaseUser.uid}`);
            if (storedData) {
              const parsedData = JSON.parse(storedData);
              Object.assign(userData, parsedData);
            }
            
            setUser(userData);
            
            // Set a cookie for server-side auth (middleware)
            try {
              const token = await firebaseUser.getIdToken();
              setCookie('firebase_auth_token', token, {
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
                secure: process.env.NODE_ENV === 'production',
              });
            } catch (tokenError) {
              console.error('Error getting ID token:', tokenError);
            }
          } else {
            // User is signed out
            console.log('No user authenticated');
            setUser(null);
            deleteCookie('firebase_auth_token');
          }
        } catch (processError) {
          console.error('Error processing auth state change:', processError);
          setError('Error processing authentication state');
        } finally {
          setLoading(false);
        }
      });

      return () => {
        console.log('Cleaning up auth state listener');
        unsubscribe();
      };
    } catch (setupError) {
      console.error('Error setting up auth state listener:', setupError);
      setError('Error initializing authentication');
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}; 