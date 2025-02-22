// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmw_qt3B-IDEdL73HzSM_McRUMX9f9PPA",
  authDomain: "dandd-18e01.firebaseapp.com",
  projectId: "dandd-18e01",
  storageBucket: "dandd-18e01.firebasestorage.app",
  messagingSenderId: "291710418529",
  appId: "1:291710418529:web:9c3b3171e3022d20adb420",
  measurementId: "G-1ZRZPSQ3EC"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const firestoreDb = getFirestore(app);
const storage = getStorage(app);

export { app, auth, provider, database, firestoreDb, storage };