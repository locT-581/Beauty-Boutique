import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../config/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const uploadImage = async (folderName, file, id, name) => {
  const storageRef = ref(storage, `${folderName}/${id}/${name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType: "image/jpeg",
    cacheControl: "public, max-age=31536000",
  });

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {},
      () => {
        console.log("Upload is done");
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};

export const deleteImage = async (folderName, id, name) => {
  const storageRef = ref(storage, `${folderName}/${id}/${name}`);
  return storageRef.delete();
};

export const deleteAllImagesInFolder = async (folderRef) => {
  try {
    const files = await listAll(folderRef);

    await Promise.all(
      files.items.map(async (fileRef) => {
        await deleteObject(fileRef);
      })
    );

    await Promise.all(
      files.prefixes.map(async (subFolderRef) => {
        await deleteAllImagesInFolder(subFolderRef);
      })
    );
  } catch (error) {
    console.error("Error deleting files in folder:", error);
  }
};

export const getPaymentMethod = async () => {
  const querySnapshot = await getDocs(collection(db, "payment-method"));
  const tempDocs = [];
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tempDocs.push({ id: doc.id, ...doc.data() });
  });
  return tempDocs;
};

export const getPaymentStatus = async () => {
  const querySnapshot = await getDocs(collection(db, "payment-status"));
  const tempDocs = [];
  querySnapshot.forEach((doc) => {
    tempDocs.push({ id: doc.id, ...doc.data() });
  });
  return tempDocs;
};

export const getOrdersByStatus = async (status) => {
  const querySnapshot = await getDocs(
    query(
      collection(db, "orders"),
      where("orderStatus", "==", status),
      orderBy("timestamp", "desc")
    )
  );
  const tempDocs = [];
  querySnapshot.forEach((doc) => {
    tempDocs.push({ id: doc.id, ...doc.data() });
  });
  return tempDocs;
};

export const getOrderStatus = async () => {
  const querySnapshot = await getDocs(collection(db, "order-status"));
  const tempDocs = [];
  querySnapshot.forEach((doc) => {
    tempDocs.push({ id: doc.id, ...doc.data() });
  });
  return tempDocs;
};

export const updateOrderStatus = async (id, status) => {
  await updateDoc(doc(db, "orders", id), {
    orderStatus: status,
  });
};

export const reduceStock = async (id, quantity) => {
  // get the current stock

  const docRef = doc(db, "products", id);
  getDoc(docRef).then((doc) => {
    const data = doc.data();
    console.log(data.stock);
    const newStock = data.stock - quantity;
    updateDoc(docRef, {
      stock: newStock,
    });
  });
};

// export const getOrderHistory = async (userId) => {
//   // get orders history is sub collection of user in firestore
//   const cartRef = doc(db, "users", userId, "orders-history");
//   getDoc(cartRef).then((doc) => {
//     console.log(doc.data());
//   });
// };
