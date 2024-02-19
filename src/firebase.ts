import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAKqJStz2ncPf-YA-OacMwYzV5nEpTBU3E',
  authDomain: 'ecombackned.firebaseapp.com',
  projectId: 'ecombackned',
  storageBucket: 'ecombackned.appspot.com',
  messagingSenderId: '1065642357690',
  appId: '1:1065642357690:web:2cde5bb0ff62059ccc6383',
  measurementId: 'G-D26BHZ69NY',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
