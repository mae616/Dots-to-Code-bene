// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIz-y3rmkdCIcPvHiSeGwWwI3QwQfYgwE",
  authDomain: "homerun-5b72e.firebaseapp.com",
  projectId: "homerun-5b72e",
  storageBucket: "homerun-5b72e.appspot.com",
  messagingSenderId: "87098004318",
  appId: "1:87098004318:web:b765a8b5fe78847615b5cf",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const auth = getAuth(firebaseApp);
