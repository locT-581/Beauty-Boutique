import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "../../serviceAccountKey.json" assert { type: "json" };
import { initializeApp as initializeClientApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaTC6J20UL2UAKL09gpCNSjULWF-018mc",
  authDomain: "beauty-boutique-57f03.firebaseServerApp.com",
  databaseURL:
    "https://beauty-boutique-57f03-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "beauty-boutique-57f03",
  storageBucket: "beauty-boutique-57f03.appspot.com",
  messagingSenderId: "1062540466152",
  appId: "1:1062540466152:web:4a9bb4c8ba1ff1bc3a765d",
};

export const firebaseServerApp = () =>
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "beauty-boutique-57f03.appspot.com",
  });

// Initialize Firebase client app
const firebaseClientApp = initializeClientApp(firebaseConfig);
export const authClient = getAuth(firebaseClientApp);
