import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//Completar esta configuración
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//base de datos
const db = firebase.firestore()

//auenticacion
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}