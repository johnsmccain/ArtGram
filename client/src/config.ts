// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNT0yifaatSkD0t0j0GmJ4AEcie0-KEj8",
  authDomain: "artgram-project.firebaseapp.com",
  projectId: "artgram-project",
  storageBucket: "artgram-project.appspot.com",
  messagingSenderId: "469071595028",
  appId: "1:469071595028:web:1c83d422963c5884a08901",
  measurementId: "G-FRGQZH3LSL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);