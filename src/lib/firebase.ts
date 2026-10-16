// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyC9BTdMpMpRsAtI3ZH3NMKLhZhOqSbfCWg",
	authDomain: "inova-search-81d10.firebaseapp.com",
	projectId: "inova-search-81d10",
	storageBucket: "inova-search-81d10.firebasestorage.app",
	messagingSenderId: "339495218500",
	appId: "1:339495218500:web:1bb1eb5afbaf4a4c22bb11",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();
