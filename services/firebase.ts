// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsP1F3JYuKG-Lv59Zi2eGYN0zCYDrpuYw",
  authDomain: "regrant.firebaseapp.com",
  projectId: "regrant",
  storageBucket: "regrant.appspot.com",
  messagingSenderId: "981860553903",
  appId: "1:981860553903:web:70053ea4b351c6e528b05a",
  measurementId: "G-E54W3S89JN",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app);
