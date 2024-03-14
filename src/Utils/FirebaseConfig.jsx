import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDkqvP8e1TJeOx1bSMZfjjANs9QNG4eU48",
  authDomain: "n-trest-v2.firebaseapp.com",
  projectId: "n-trest-v2",
  storageBucket: "n-trest-v2.appspot.com",
  messagingSenderId: "49163903118",
  appId: "1:49163903118:web:59a5c47a566a69311fe9df"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDkqvP8e1TJeOx1bSMZfjjANs9QNG4eU48",
//   authDomain: "n-trest-v2.firebaseapp.com",
//   projectId: "n-trest-v2",
//   storageBucket: "n-trest-v2.appspot.com",
//   messagingSenderId: "49163903118",
//   appId: "1:49163903118:web:59a5c47a566a69311fe9df"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);