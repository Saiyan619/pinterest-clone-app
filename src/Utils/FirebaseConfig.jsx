import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDPkKB1tlzZplCsYBfDn4DE-mwBT8O4oj0",
  authDomain: "n-trest.firebaseapp.com",
  projectId: "n-trest",
  storageBucket: "n-trest.appspot.com",
  messagingSenderId: "1018450923",
  appId: "1:1018450923:web:be74f22b46a92deb5a7fae"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);