import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBw33h3XENM8EUiLTm22En9NcnX7FbZECU",
    authDomain: "meal-mate-805c4.firebaseapp.com",
    databaseURL: "https://meal-mate-805c4-default-rtdb.firebaseio.com",
    projectId: "meal-mate-805c4",
    storageBucket: "meal-mate-805c4.firebasestorage.app",
    messagingSenderId: "661508893300",
    appId: "1:661508893300:web:b22b61f4191e672596ff21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
export default app;