import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyA7X1w7p4wv1yZi9Rg8zj2nJEkyNrlUcPU",
  authDomain: "eventeasy-a23cf.firebaseapp.com",
  projectId: "eventeasy-a23cf",
  storageBucket: "eventeasy-a23cf.appspot.com",
  messagingSenderId: "1088880626481",
  appId: "1:1088880626481:web:2b3c0949108263500ebe10",
  measurementId: "G-K7BPMD7FLV"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
}); 
const db = getFirestore(app);
export { db,auth }; 
