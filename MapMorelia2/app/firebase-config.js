// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWy5hMMwX-YgaFekrk-_SYkOIUWhNlHzU",
  authDomain: "mapmorelia2.firebaseapp.com",
  projectId: "mapmorelia2",
  storageBucket: "mapmorelia2.appspot.com",
  messagingSenderId: "1073144080360",
  appId: "1:1073144080360:web:d1b0d6b3188cbcd114e65d",
  measurementId: "G-M06JZSF67K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);