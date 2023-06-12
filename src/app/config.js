// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5wCm9kjMvbH0R6HhntLG3t8N14ip7R_I",
  authDomain: "catdopt-3b0b1.firebaseapp.com",
  projectId: "catdopt-3b0b1",
  storageBucket: "catdopt-3b0b1.appspot.com",
  messagingSenderId: "264178566421",
  appId: "1:264178566421:web:271db98b4a011f31c7951c",
  measurementId: "G-3462WX8ZXK",
};

// Initialize Firebase
const firebase_app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

export default firebase_app;
