
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8B2FU8cifBrhY_XZh8Be9S2GWf47JT80",
  authDomain: "esp-32-700fc.firebaseapp.com",
  databaseURL: "https://esp-32-700fc-default-rtdb.firebaseio.com",
  projectId: "esp-32-700fc",
  storageBucket: "esp-32-700fc.appspot.com",
  messagingSenderId: "1025393969012",
  appId: "1:1025393969012:web:dc866d5c207f191e818e21",
  measurementId: "G-SN2VVPTVEL"
};

const app = initializeApp(firebaseConfig);


const db = getDatabase(app);
const auth = getAuth(app);

export { auth,db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
