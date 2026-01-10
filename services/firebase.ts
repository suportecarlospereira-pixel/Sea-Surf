// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPflcjpX_HOfNYR8qKx6DTNpqnVVvkN5c",
  authDomain: "seasurf-2eb71.firebaseapp.com",
  projectId: "seasurf-2eb71",
  storageBucket: "seasurf-2eb71.firebasestorage.app",
  messagingSenderId: "655350422564",
  appId: "1:655350422564:web:c81f61ceddaf32c0c50cb1",
  measurementId: "G-E8BTHCPLZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const db = getFirestore(app);
export const storage = getStorage(app);
