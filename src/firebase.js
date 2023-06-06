// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBfca2P18GHLbGoeXjAWAAzAV9HevgpEKc",
  authDomain: "fir-auth-49f1c.firebaseapp.com",
  projectId: "fir-auth-49f1c",
  storageBucket: "fir-auth-49f1c.appspot.com",
  messagingSenderId: "22630210063",
  appId: "1:22630210063:web:ee5a3b7fadcc6af066617a",
  measurementId: "G-41N3QJ6BZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {app,auth};