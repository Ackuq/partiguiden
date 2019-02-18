import firebase from "firebase/app";
import "firebase/firestore";

export function loadFirebase() {
  // Initialize Firebase
  try {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    };
    firebase.initializeApp(config);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.log("Firebase initialize error");
    }
  }
  return firebase;
}
