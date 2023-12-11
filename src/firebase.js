import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
const firebaseConfig = {
    apiKey: 'AIzaSyD_WbvCinQf6FaYm7zaXoZksBs8jSdm7pE',
    authDomain: 'tded-commerce.firebaseapp.com',
    databaseURL: 'https://tded-commerce-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'tded-commerce',
    storageBucket: 'tded-commerce.appspot.com',
    messagingSenderId: '507352318452',
    appId: '1:507352318452:web:9528fe9a11e62f5213b9a1'
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const realtimeDB = getDatabase();
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectStorageEmulator(storage, "127.0.0.1", 9199);
  connectDatabaseEmulator(realtimeDB, "127.0.0.1", 9000);
  export {
    db,
    auth,
    storage,
    realtimeDB
  }