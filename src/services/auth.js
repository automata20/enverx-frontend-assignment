import {
  // createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, googleProvider } from './firebase.config';

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  try {
    await signOut(auth, googleProvider);
  } catch (err) {
    console.log(err);
  }
};
