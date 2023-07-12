/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCYtDvUCzYzp-5Vuajbu2RIMxCPAezzaPk',
  authDomain: 'enverx-expense-tracker.firebaseapp.com',
  projectId: 'enverx-expense-tracker',
  storageBucket: 'enverx-expense-tracker.appspot.com',
  messagingSenderId: '629786822234',
  appId: '1:629786822234:web:31780985518238aacf7a63',
  measurementId: 'G-24WDT46MNK'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
