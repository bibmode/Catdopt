"use client";

import AppBar from "@/components/appbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5wCm9kjMvbH0R6HhntLG3t8N14ip7R_I",
  authDomain: "catdopt-3b0b1.firebaseapp.com",
  projectId: "catdopt-3b0b1",
  storageBucket: "catdopt-3b0b1.appspot.com",
  messagingSenderId: "264178566421",
  appId: "1:264178566421:web:271db98b4a011f31c7951c",
  measurementId: "G-3462WX8ZXK",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth();
export const user = auth.currentUser;

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} w-full h-screen bg-white flex flex-col container mx-auto px-4 `}
      >
        <AppBar />
        <div className="flex-grow">{children}</div>
      </body>
    </html>
  );
}
