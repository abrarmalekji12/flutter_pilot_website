import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfeVWioScVJTc6XW9-pIOvBELABsOW25w",
  authDomain: "flutter-visual-builder-staging.firebaseapp.com",
  projectId: "flutter-visual-builder-staging",
  storageBucket: "flutter-visual-builder-staging.appspot.com",
  messagingSenderId: "585919568929",
  appId: "1:585919568929:web:fea7aa5a8df89ae898d760"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
