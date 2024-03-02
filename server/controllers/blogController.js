import dotenv from "dotenv";

import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

import { authClient } from "../config/firebaseConfig.js";

import sendCookie from "../utils/sendCookie.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsync from "../middlewares/catchAsync.js";

dotenv.config();

// Add product
export const addEmptyBlog = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const db = getFirestore();
  const blogCollection = db.collection("blogs");
  console.log("title:", req.body);
  const newBlog = {
    title,
    avatar: "",
    content: "",
    voucher: [],
    status: "Draft",
    likes: 0,
    views: 0,
    lastUpdate: FieldValue.serverTimestamp(),
    createAt: FieldValue.serverTimestamp(),
  };
  // Add product into Database
  blogCollection
    .add(newBlog)
    .then((blog) => {
      console.log("Add an empty blog successfully");
      res.status(200).json({
        success: true,
        blog: { id: blog.id, ...newBlog },
      });
    })
    .catch((error) => {
      console.log("Error when add product into Firestore:", error);
      return res.status(400).json(error);
    });
});

// Remove product
export const removeProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const db = getFirestore();
  const productCollection = db.collection("products");

  // Check product exist by id
  const product = await productCollection.doc(productId).get();
  if (product.empty) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  productCollection
    .doc(productId)
    .delete()
    .then(() => {
      console.log("Remove product successfully");
      res.status(200).json({
        success: true,
        message: "Product Removed",
      });
    })
    .catch((error) => {
      console.log("Error when remove product:", error);
      return res.status(400).json(error);
    });
});

// Update product
export const updateBlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const db = getFirestore();
  const blogCollection = db.collection("blogs");

  const blog = await blogCollection.doc(blogId).get();
  if (blog.empty) {
    return next(new ErrorHandler("Blog Not Found", 404));
  }

  const {
    title,
    content,
    voucher,
    createAt,
    lastUpdate,
    status,
    likes,
    views,
    avatar,
  } = req.body;

  const updatedBlog = {
    title,
    content,
    voucher,
    createAt,
    lastUpdate,
    status,
    likes,
    views,
    avatar,
  };
  // just update the fields that are not empty
  for (let key in updatedBlog) {
    if (!updatedBlog[key]) {
      delete updatedBlog[key];
    }
  }

  //If no fields are updated
  if (Object.keys(updatedBlog).length === 0) {
    return next(new ErrorHandler("Fill at least 1 field!", 400));
  }

  blogCollection
    .doc(blogId)
    .update({ updateAt: FieldValue.serverTimestamp(), ...updatedBlog })
    .then(() => {
      console.log("Update blog successfully");
      res.status(200).json({
        success: true,
        message: "Blog Updated",
      });
    })
    .catch((error) => {
      console.log("Error when update blog:", error);
      return res.status(400).json(error);
    });
});
