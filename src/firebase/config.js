import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";


const firebaseConfig = {
    apiKey: "AIzaSyCyDlj15PL5KCkDzhKDMk4lhMQaJoMCwWI",
    authDomain: "calendarapp-89311.firebaseapp.com",
    projectId: "calendarapp-89311",
    storageBucket: "calendarapp-89311.appspot.com",
    messagingSenderId: "223435599609",
    appId: "1:223435599609:web:0e0095e53f7002935a3c28"
};

export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);
