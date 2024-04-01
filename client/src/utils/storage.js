import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

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
