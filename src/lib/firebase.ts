// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHINQYOr9tfgSbrDVKK5Dfm6XlEvhHXk0",
  authDomain: "cancel-alert-app.firebaseapp.com",
  projectId: "cancel-alert-app",
  storageBucket: "cancel-alert-app.firebasestorage.app",
  messagingSenderId: "1025624107398",
  appId: "1:1025624107398:web:27275bb2a29552aa916407",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
