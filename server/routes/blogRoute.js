import express from "express";

import * as blogController from "../controllers/blogController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();

router.post("/add", blogController.addEmptyBlog);
router.put("/update", blogController.updateBlog);
// router.delete("/delete/:id", blogController.removeProduct);

export default router;
