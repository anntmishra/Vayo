import { 
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  FirebaseUser
} from './firebase';

// User type definition
export interface User {
  email: string;
  name?: string;
  uid?: string;
}

// Helper function to check if Firebase Auth is properly configured
const checkFirebaseAuth = () => {
  if (!auth) {
    console.error('Firebase Auth is not initialized');
    throw new Error('Authentication service is not available');
  }
  
  if (!auth.app) {
    console.error('Firebase Auth app is not properly linked');
    throw new Error('Authentication service configuration error');
  }
};

// Register user with Firebase
export const registerUser = async (email: string, password: string, name?: string): Promise<User> => {
  console.log('Attempting to register user:', email);
  try {
    checkFirebaseAuth();
    
    // For auth/configuration-not-found errors, let's try a simple approach
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Registration successful:', userCredential);
    
    const user = {
      email: userCredential.user.email || '',
      uid: userCredential.user.uid,
      name
    };
    
    // Store any additional user data in localStorage for demo purposes
    // In a real app, you would store this in Firestore or another database
    if (name) {
      const userData = { ...user };
      localStorage.setItem(`vayo_user_${user.uid}`, JSON.stringify(userData));
    }
    
    return user;
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Special handling for configuration error
    if (error.code === 'auth/configuration-not-found') {
      console.error('Firebase auth configuration not found. Make sure you have enabled Email/Password authentication in the Firebase console.');
      throw new Error('Authentication not properly configured. Please contact support.');
    }
    
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('User with this email already exists');
    }
    
    throw error;
  }
};

// Login user with Firebase
export const loginUser = async (email: string, password: string): Promise<User> => {
  console.log('Attempting to login user:', email);
  try {
    checkFirebaseAuth();
    
    // For auth/configuration-not-found errors, let's add some validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful:', userCredential);
    
    // Try to get additional user data from localStorage (for demo)
    let userData: User = {
      email: userCredential.user.email || '',
      uid: userCredential.user.uid
    };
    
    const storedData = localStorage.getItem(`vayo_user_${userCredential.user.uid}`);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      userData = { ...userData, ...parsedData };
    }
    
    return userData;
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Special handling for configuration error
    if (error.code === 'auth/configuration-not-found') {
      console.error('Firebase auth configuration not found. Make sure you have enabled Email/Password authentication in the Firebase console.');
      throw new Error('Authentication not properly configured. Please contact support.');
    }
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      throw new Error('Invalid email or password');
    }
    
    throw error;
  }
};

// Get current logged in user
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    try {
      checkFirebaseAuth();
      
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe();
        if (!user) {
          resolve(null);
          return;
        }
        
        // Try to get additional user data from localStorage (for demo)
        let userData: User = {
          email: user.email || '',
          uid: user.uid
        };
        
        const storedData = localStorage.getItem(`vayo_user_${user.uid}`);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          userData = { ...userData, ...parsedData };
        }
        
        resolve(userData);
      });
    } catch (error) {
      console.error('Error checking current user:', error);
      resolve(null);
    }
  });
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    checkFirebaseAuth();
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};

// Check if user is logged in
export const isLoggedIn = async (): Promise<boolean> => {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}; 