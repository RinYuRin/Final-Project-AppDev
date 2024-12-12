import { initializeApp } from "firebase/app";
import {
  getAuth,
  InitializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";



import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtIce5zSWCfhaVdra_QLf0TP8AexO9H8o",
    authDomain: "finalproj-5756a.firebaseapp.com",
    databaseURL: "https://finalproj-5756a-default-rtdb.firebaseio.com",
    projectId: "finalproj-5756a",
    storageBucket: "finalproj-5756a.firebasestorage.app",
    messagingSenderId: "779527721388",
    appId: "1:779527721388:web:2d0a1a44d4f7470bbf6a09",
    measurementId: "G-6GLNQVFF9L"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app, {
 // persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const realtimedb = getDatabase(app);


export { app, auth, db, realtimedb};