// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHwYRJXk9LWn0srzNCXANVOd0D614R3LQ",
  authDomain: "julian-portfolio-chat.firebaseapp.com",
  projectId: "julian-portfolio-chat",
  storageBucket: "julian-portfolio-chat.firebasestorage.app",
  messagingSenderId: "1036743485760",
  appId: "1:1036743485760:web:87b908ae24a8ce2dae72a5",
  measurementId: "G-XS7VHMK1RC"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);
