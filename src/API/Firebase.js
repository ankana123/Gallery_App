// import { initializeApp } from "firebase/app";
// import { getFirestore } from"firebase/firestore";
// import { getStorage } from"firebase/storage";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAEmwRHoWe-F1VFNpdWgBMtD8FRsbVrmuk",
    authDomain: "gallery-87097.firebaseapp.com",
    projectId: "gallery-87097",
    storageBucket: "gallery-87097.appspot.com",
    messagingSenderId: "1039254496344",
    appId: "1:1039254496344:web:2fa0ecd026c46548a3962d"
};

// const app = initializeApp(firebaseConfig);

// export const firestore = getFirestore(app);
// export const storage = getStorage(app);

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const storage = firebase.storage();