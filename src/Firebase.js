import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAwYvr9a0ZdCPOXXh9N2_fqJTasGjcHtus",
  authDomain: "whatsapp-clone-1fe64.firebaseapp.com",
  projectId: "whatsapp-clone-1fe64",
  storageBucket: "whatsapp-clone-1fe64.appspot.com",
  messagingSenderId: "834972220319",
  appId: "1:834972220319:web:dea8b47f5928f988ee9baa",
  measurementId: "G-SD2F8G4KEK"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
