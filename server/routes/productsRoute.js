import express from "express";

import * as productController from "../controllers/productController.js";
import isAuthenticated from "../middlewares/auth.js";
const router = express.Router();

router.post("/upload", productController.addProduct);
router.delete("/delete/:id", productController.removeProduct);
router.get("/get", productController.getProducts);
router.get("/get-all", productController.getAllProducts);
router.get("/get/:id", productController.getProductById);

router.put("/update/:id", productController.updateProduct);

router.get("/get-display-mode", productController.getDisplayMode);

// delete many products
router.post("/delete-many", productController.deleteManyProducts);

// router
//   .route("/me")
//   .get(isAuthenticated, productController.getAccountDetails)
//   .delete(isAuthenticated, productController.deleteProfile);

// // put request -> update something
// router.put("/update/password", isAuthenticated, productController.updatePassword);
// router.put("/update/profile", isAuthenticated, productController.updateProfile);

// router.route("/password/forgot").post(productController.forgotPassword);
// router.route("/password/reset/:token").put(productController.resetPassword);

export default router;
