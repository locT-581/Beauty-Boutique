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

// add product to cart
router.post("/add-to-cart/:id", isAuthenticated, productController.addToCart);
// get all products in cart
router.get(
  "/get-product-from-cart",
  isAuthenticated,
  productController.getAllProductsFromCart
);
// remove product from cart
router.post(
  "/remove-from-cart",
  isAuthenticated,
  productController.removeFromCart
);

// update product in cart
router.put(
  "/update-product-in-cart/:id",
  isAuthenticated,
  productController.updateProductInCart
);

router.post("/add-order", isAuthenticated, productController.addOrder);

export default router;
