import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyChnl_ICrYUINNntpLuQF22aqSX0R9JJR0",
  authDomain: "react-native-mobile-app-d5f3f.firebaseapp.com",
  databaseURL:
    "https://react-native-mobile-app-d5f3f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "react-native-mobile-app-d5f3f",
  storageBucket: "react-native-mobile-app-d5f3f.appspot.com",
  messagingSenderId: "944101785735",
  appId: "1:944101785735:web:cf118546dc105631fd7822",
  measurementId: "G-WNLVLHKBP2",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(getApp(), {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
