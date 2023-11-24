// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  GoogleAuthProvider } from "firebase/auth";
import { getFirestore ,doc, setDoc } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaNwCVlFINMRwSCMLj27dTiAcytniGbxA",
  authDomain: "personal-finance-tracker-2f5c1.firebaseapp.com",
  projectId: "personal-finance-tracker-2f5c1",
  storageBucket: "personal-finance-tracker-2f5c1.appspot.com",
  messagingSenderId: "26743222725",
  appId: "1:26743222725:web:31a25c8c4c6104d8731bac",
  measurementId: "G-VX83Y1XLM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db,auth,provider,doc,setDoc};