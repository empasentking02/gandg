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
  apiKey: "AIzaSyDTbGki0c4PVQ6N_YtUBbhZ35avd14Jf4Y",
  authDomain: "gandg-7befc.firebaseapp.com",
  projectId: "gandg-7befc",
  storageBucket: "gandg-7befc.firebasestorage.app",
  messagingSenderId: "964767640796",
  appId: "1:964767640796:web:89d5d5a1299bdc83cad819",
  measurementId: "G-YNQSDMHHYY"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);
const firestoreDb = getFirestore(app);
const storage = getStorage(app);

export { app, auth, provider, database, firestoreDb, storage };