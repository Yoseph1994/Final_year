// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: "adventurehub-f15d5.firebaseapp.com",
  projectId: "adventurehub-f15d5",
  storageBucket: "adventurehub-f15d5.appspot.com",
  messagingSenderId: "657754248607",
  appId: "1:657754248607:web:3fd5383bdc1584e24219aa",
  measurementId: "G-SHE0KNFQ20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);