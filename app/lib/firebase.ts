import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  connectAuthEmulator
} from 'firebase/auth';

// Your Firebase configuration with direct values
const firebaseConfig = {
  apiKey: "AIzaSyDhc2413zyiavl8gNvyM1mSdJoemO52rm8",
  authDomain: "vayo-6e1dd.firebaseapp.com",
  projectId: "vayo-6e1dd",
  storageBucket: "vayo-6e1dd.appspot.com",
  messagingSenderId: "606265454404",
  appId: "1:606265454404:web:ce6db7c40621b477cf3111",
  measurementId: "G-KBNNZ1T8KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Clear any previous initialization that might be causing conflicts
auth.tenantId = null;

// Export everything
export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};

export type { FirebaseUser }; 