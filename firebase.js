import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBCUo0awdLot_EL-BiQ7SYPyG-95ipM2w4",
  authDomain: "streetscommerce.firebaseapp.com",
  projectId: "streetscommerce",
  storageBucket: "streetscommerce.appspot.com",
  messagingSenderId: "23348028208",
  appId: "1:23348028208:web:63c9bc168c96c6c86adef5",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
