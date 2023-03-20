// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOQBmYevUatDYLn0Fzg9DC53qEi3i5HI8",
  authDomain: "app-web-ibudget.firebaseapp.com",
  projectId: "app-web-ibudget",
  storageBucket: "app-web-ibudget.appspot.com",
  messagingSenderId: "854976238706",
  appId: "1:854976238706:web:33d10aff31a427db6ddeeb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
