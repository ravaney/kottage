// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCET5bYW-5U-3wwfzAmCLEjbAK3QSrTZIU",
  authDomain: "kottage-e9121.firebaseapp.com",
  databaseURL: "https://kottage-e9121-default-rtdb.firebaseio.com",
  projectId: "kottage-e9121",
  storageBucket: "kottage-e9121.appspot.com",
  messagingSenderId: "688914635179",
  appId: "1:688914635179:web:a221e73b5b2be234299aee",
  measurementId: "G-M6SFY50R7D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

export { app, storage, auth, database, firestore };
