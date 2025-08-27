// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 

const firebaseConfig = {
//   apiKey: "AIzaSyB2ahG_u8gYw2UtXbkzKt9BohlveKMfeko",
//   authDomain: "kinene-d3645.firebaseapp.com",
//   projectId: "kinene-d3645",
//   storageBucket: "kinene-d3645.firebasestorage.app",
//   messagingSenderId: "969746174646",
//   appId: "1:969746174646:web:1d048e5987c2683428cc17"

  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);