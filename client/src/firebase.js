// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqCPDyxkIe-ZMFog64QOHUfrWetIhNAAo",
  authDomain: "project-app-health.firebaseapp.com",
  projectId: "project-app-health",
  storageBucket: "project-app-health.appspot.com",
  messagingSenderId: "90015620625",
  appId: "1:90015620625:web:deee2bcc61f7862f895bb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage_bucket = getStorage(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const firestore = getFirestore(app);