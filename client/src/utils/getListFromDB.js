import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

// Get list from database
const getListFromDB = async (collectionName, query = { search: "" }) => {
  const { search } = query;
  const querySnapshot = await getDocs(collection(db, collectionName));
  let list = [];
  querySnapshot.forEach((doc) => {
    if (search) {
      if (doc.data().name.toLowerCase().includes(search.toLowerCase())) {
        list.push(doc.data());
      }
    } else list.push(doc.data());
  });
  return list;
};
export default getListFromDB;
