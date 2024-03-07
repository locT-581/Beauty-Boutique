import express from "express";

import * as blogController from "../controllers/blogController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();

router.post("/add", blogController.addEmptyBlog);
router.put("/update/:id", blogController.updateBlog);

router.get("/get-all", blogController.getAllBlog);
router.get("/get/:id", blogController.getBlogById);
router.get("/get", blogController.getBlogs);

router.delete("/delete-many", blogController.deleteManyBlogs);
router.delete("/delete/:id", blogController.deleteBlog);

export default router;
