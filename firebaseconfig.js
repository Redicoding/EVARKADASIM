import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnftipcOP6vSctIjwLxhQbCl8CpCtU2fE",
    authDomain: "ev-arkadasim-e0c75.firebaseapp.com",
    projectId: "ev-arkadasim-e0c75",
    storageBucket: "ev-arkadasim-e0c75.appspot.com",
    messagingSenderId: "274692608346",
    appId: "1:274692608346:web:1ae4fbcc7d0d5650186363",
    measurementId: "G-5ZDV3628LJ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };