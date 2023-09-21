
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUDLiFPFLknvKuT2EOA_9mX3JsRmD7tws",
  authDomain: "reactnotes-e0640.firebaseapp.com",
  projectId: "reactnotes-e0640",
  storageBucket: "reactnotes-e0640.appspot.com",
  messagingSenderId: "342476709670",
  appId: "1:342476709670:web:c577961f026746f355abe7"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const notesCollection = collection(db, "notes");