import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyC7exxNU9pBpOkvoREqs4B_9SnK8hCutYw",
    authDomain: "eduapp-1564e.firebaseapp.com",
    projectId: "eduapp-1564e",
    storageBucket: "eduapp-1564e.appspot.com",
    messagingSenderId: "928447674400",
    appId: "1:928447674400:web:55d7b7c07cd9637aaf2445",
    measurementId: "G-VGS7BLEGGM"
  };

// Initialize Firebase App
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps()[0];
}

// Initialize Firebase Auth with AsyncStorage for persistence
let auth;
if (!getAuth(app)) {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} else {
    auth = getAuth(app);
}

const firestore = getFirestore(app);

export { auth, firestore };