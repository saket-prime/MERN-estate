// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
    authDomain: "mern-estate-d360d.firebaseapp.com",
    projectId: "mern-estate-d360d",
    storageBucket: "mern-estate-d360d.appspot.com",
    messagingSenderId: "641858671218",
    appId: "1:641858671218:web:4fd52fef248cfb7d9ba8eb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);