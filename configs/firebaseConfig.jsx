// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-video-generator-e3b02.firebaseapp.com",
  projectId: "ai-video-generator-e3b02",
  storageBucket: "ai-video-generator-e3b02.firebasestorage.app",
  messagingSenderId: "4293568594",
  appId: "1:4293568594:web:d56024289fd99f4228978b",
  measurementId: "G-6N9E4KDLD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);