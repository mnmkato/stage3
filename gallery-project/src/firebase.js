import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJtcgvM1I8Ye3qYwZbtSVqS9RhdvAa4Yw",
    authDomain: "gallery-9a092.firebaseapp.com",
    projectId: "gallery-9a092",
    storageBucket: "gallery-9a092.appspot.com",
    messagingSenderId: "899985265589",
    appId: "1:899985265589:web:781d3df788a2139f723ffc",
    measurementId: "G-DBMD83Z856"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
    
export default auth
