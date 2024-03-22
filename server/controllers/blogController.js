import dotenv from "dotenv";

import { FieldValue, getFirestore } from "firebase-admin/firestore";

import ErrorHandler from "../utils/errorHandler.js";
import catchAsync from "../middlewares/catchAsync.js";

dotenv.config();

// Add empty blog
export const addEmptyBlog = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const db = getFirestore();
  const blogCollection = db.collection("blogs");
  console.log("title:", req.body);
  const newBlog = {
    title: title || "",
    avatar: "",
    content: "",
    voucher: [],
    likes: 0,
    views: 0,
    lastUpdate: FieldValue.serverTimestamp(),
    createAt: FieldValue.serverTimestamp(),
    displayMode: "private",
  };
  // Add blog into Database
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
      console.log("Error when add blog into Firestore:", error);
      return res.status(400).json(error);
    });
});

// Update blog
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
    displayMode,
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
    displayMode,
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
    .update({ lastUpdate: FieldValue.serverTimestamp(), ...updatedBlog })
    .then(() => {
      console.log("Update blog successfully");
      res.status(200).json({
        blog: { id: blog.id, ...blog.data(), ...updatedBlog },
        success: true,
        message: "Cập nhật thành công",
      });
    })
    .catch((error) => {
      console.log("Error when update blog:", error);
      return res.status(400).json(error);
    });
});

// Get all Blogs
export const getAllBlog = catchAsync(async (req, res, next) => {
  const db = getFirestore();
  const blogCollection = db.collection("blogs");
  blogCollection
    .get()
    .then((blogs) => {
      let blogList = [];
      blogs.forEach((blog) => {
        blogList.push({ id: blog.id, ...blog.data() });
      });
      res.status(200).json({
        success: true,
        blogs: blogList,
      });
    })
    .catch((error) => {
      console.log("Error when get all blogs:", error);
      return res.status(400).json(error);
    });
});

// Get blogs
export const getBlogs = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 8, search = "" } = req.query;
  const db = getFirestore();
  const blogCollection = db.collection("blogs");
  const blogs = [];

  // Get all blogs from Firestore
  blogCollection
    .orderBy("title", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (search) {
          if (doc.data().title.toLowerCase().includes(search.toLowerCase())) {
            blogs.push({ id: doc.id, ...doc.data() });
          }
        } else {
          blogs.push({ id: doc.id, ...doc.data() });
        }
      });
      res.status(200).json({
        success: true,
        blogs,
      });
    })
    .catch((error) => {
      console.log("Error when get all blogs:", error);
      return res.status(400).json(error);
    });
});

// Get blog by id
export const getBlogById = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const db = getFirestore();
  const blogCollection = db.collection("blogs");
  const blog = await blogCollection.doc(blogId).get();
  if (blog.empty) {
    return next(new ErrorHandler("Blog Not Found", 404));
  }
  res.status(200).json({
    success: true,
    blog: { id: blog.id, ...blog.data() },
  });
});

// Delete many blogs
export const deleteManyBlogs = catchAsync(async (req, res, next) => {
  const { ids } = req.body;
  const db = getFirestore();
  const blogCollection = db.collection("blogs");
  const batch = db.batch();
  ids.forEach((id) => {
    const blogRef = blogCollection.doc(id);
    batch.delete(blogRef);
  });
  batch
    .commit()
    .then(() => {
      console.log("Delete many blogs successfully");
      res.status(200).json({
        success: true,
        message: "Xóa bài viết thành công",
      });
    })
    .catch((error) => {
      console.log("Error when delete many blogs:", error);
      return res.status(400).json(error);
    });
});

// Delete blog by id
export const deleteBlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.id;
  const db = getFirestore();
  const blogCollection = db.collection("blogs");
  blogCollection
    .doc(blogId)
    .delete()
    .then(() => {
      console.log("Delete blog successfully");
      res.status(200).json({
        success: true,
        message: "Xóa bài viết thành công",
      });
    })
    .catch((error) => {
      console.log("Error when delete blog:", error);
      return res.status(400).json(error);
    });
});
