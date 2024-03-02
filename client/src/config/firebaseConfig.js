import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
