// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOv8NOAgO7sdKzguXBwC6E9IG86s4dWeA",
    authDomain: "medilacconsulting.firebaseapp.com",
    projectId: "medilacconsulting",
    storageBucket: "medilacconsulting.firebasestorage.app",
    messagingSenderId: "1016957796526",
    appId: "1:1016957796526:web:1e41e93855578b62226d3f",
    measurementId: "G-L4GCLM4QQT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
