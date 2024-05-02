import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBQkEIA8xxj3Ngd5nerSCKORV3og78ybm0",
  authDomain: "flat-finder-e19e4.firebaseapp.com",
  projectId: "flat-finder-e19e4",
  storageBucket: "flat-finder-e19e4.appspot.com",
  messagingSenderId: "180369539313",
  appId: "1:180369539313:web:e0a1af1e1e214eb8e4e950"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app)

