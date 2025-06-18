import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoNv2YTDX0ac_xJFMcgTeuiu4YdJGdMnw",
  authDomain: "higginsai.firebaseapp.com",
  databaseURL: "https://higginsai-default-rtdb.firebaseio.com",
  projectId: "higginsai",
  storageBucket: "higginsai.firebasestorage.app",
  messagingSenderId: "97751530444",
  appId: "1:97751530444:web:b6a57ff57281f9ef3afb69",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
