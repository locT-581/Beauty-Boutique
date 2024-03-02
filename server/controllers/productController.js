import dotenv from "dotenv";

import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

import { authClient } from "../config/firebaseConfig.js";

import sendCookie from "../utils/sendCookie.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsync from "../middlewares/catchAsync.js";

dotenv.config();

// Add product
export const addProduct = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    price,
    imageUrls,
    ingredients,
    category,
    stock,
    avatar,
    displayMode,
  } = req.body;
  const db = getFirestore();
  const productCollection = db.collection("products");

  // Check any field is empty
  if (!name || !description || !price || !ingredients || !category || !stock) {
    return next(new ErrorHandler("Please fill in all fields", 400));
  }
  // Check product exist by name
  const product = await productCollection.where("name", "==", name).get();
  if (!product.empty) {
    return next(new ErrorHandler("Product already exists", 400));
  }

  const newProduct = {
    name,
    description,
    price,
    imageUrls,
    ingredients,
    category,
    stock,
    avatar,
    displayMode,
    soldQuantity: 0,
    timestamp: FieldValue.serverTimestamp(),
  };

  // Add product into Database
  productCollection
    .add(newProduct)
    .then(() => {
      console.log("Add product successfully");
      res.status(200).json({
        success: true,
        product: newProduct,
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

// Delete many products
export const deleteManyProducts = catchAsync(async (req, res, next) => {
  const db = getFirestore();
  const productCollection = db.collection("products");

  const { ids } = req.body;
  if (!ids) {
    return next(new ErrorHandler("Please select products to delete", 400));
  }

  ids.forEach(async (id) => {
    const product = await productCollection.doc(id).get();
    if (product.empty) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    productCollection
      .doc(id)
      .delete()
      .then(() => {
        console.log("Remove product successfully");
      })
      .catch((error) => {
        console.log("Error when remove product:", error);
        return res.status(400).json(error);
      });
  });

  res.status(200).json({
    success: true,
    message: "Đã xóa thành công!",
  });
});

// Get all products
export const getAllProducts = catchAsync(async (req, res, next) => {
  const db = getFirestore();
  const productCollection = db.collection("products");

  const products = [];
  productCollection
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json({
        success: true,
        products,
      });
    })
    .catch((error) => {
      console.log("Error when get all products:", error);
      return res.status(400).json(error);
    });
});

export const getProducts = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 8, search = "" } = req.query;
  const db = getFirestore();
  const productCollection = db.collection("products");
  const products = [];

  // Get all products from Firestore
  productCollection
    .orderBy("name", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (search) {
          if (doc.data().name.toLowerCase().includes(search.toLowerCase())) {
            products.push({ id: doc.id, ...doc.data() });
          }
        } else {
          products.push({ id: doc.id, ...doc.data() });
        }
      });
      res.status(200).json({
        success: true,
        products,
      });
    })
    .catch((error) => {
      console.log("Error when get all products:", error);
      return res.status(400).json(error);
    });
});

// Get product by id
export const getProductById = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const db = getFirestore();
  const productCollection = db.collection("products");

  productCollection
    .doc(productId)
    .get()
    .then((product) => {
      if (product.empty) {
        return next(new ErrorHandler("Product Not Found", 404));
      }
      res.status(200).json({
        success: true,
        product: { id: product.id, ...product.data() },
      });
    })
    .catch((error) => {
      console.log("Error when get product by id:", error);
      return res.status(400).json(error);
    });
});

// Update product
export const updateProduct = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const db = getFirestore();
  const productCollection = db.collection("products");

  const product = await productCollection.doc(productId).get();
  if (product.empty) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const {
    name,
    description,
    price,
    imageUrls,
    ingredients,
    category,
    stock,
    avatar,
    displayMode,
  } = req.body;

  const updatedProduct = {
    name,
    description,
    price,
    imageUrls,
    ingredients,
    category,
    stock,
    avatar,
    displayMode,
  };
  // Just update the fields that are not empty
  for (let key in updatedProduct) {
    if (!updatedProduct[key] && updatedProduct[key] !== 0) {
      delete updatedProduct[key];
    }
  }

  //If no fields are updated
  if (Object.keys(updatedProduct).length === 0) {
    return next(
      new ErrorHandler("Hãy cập nhật ý nhất một trường dữ liệu!", 400)
    );
  }

  productCollection
    .doc(productId)
    .update(updatedProduct)
    .then(() => {
      console.log("Update product successfully");
      res.status(200).json({
        success: true,
        message: "Cập nhật thành công!",
      });
    })
    .catch((error) => {
      console.log("Error when update product:", error);
      return res.status(400).json(error);
    });
});

// Add product to cart
export const addToCart = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const db = getFirestore();
  const productCollection = db.collection("products");

  const product = await productCollection.doc(productId).get();
  if (product.empty) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const user = getAuth(authClient);
  if (!user) {
    return next(new ErrorHandler("Please login to add product to cart", 401));
  }

  const { uid } = user;
  const cartRef = db.collection("users").doc(uid).collection("cart");

  const productData = product.data();
  cartRef
    .doc(productId)
    .set(productData)
    .then(() => {
      console.log("Add product to cart successfully");
      res.status(200).json({
        success: true,
        message: "Add product to cart successfully",
      });
    })
    .catch((error) => {
      console.log("Error when add product to cart:", error);
      return res.status(400).json(error);
    });
});

// Remove product from cart
export const removeFromCart = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const db = getFirestore();
  const productCollection = db.collection("products");

  const product = await productCollection.doc(productId).get();
  if (product.empty) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const user = getAuth(authClient);
  if (!user) {
    return next(
      new ErrorHandler("Please login to remove product from cart", 401)
    );
  }

  const { uid } = user;
  const cartRef = db.collection("users").doc(uid).collection("cart");

  cartRef
    .doc(productId)
    .delete()
    .then(() => {
      console.log("Remove product from cart successfully");
      res.status(200).json({
        success: true,
        message: "Remove product from cart successfully",
      });
    })
    .catch((error) => {
      console.log("Error when remove product from cart:", error);
      return res.status(400).json(error);
    });
});

// Get all products from cart
export const getAllProductsFromCart = catchAsync(async (req, res, next) => {
  const db = getFirestore();
  const user = getAuth(authClient);
  if (!user) {
    return next(
      new ErrorHandler("Please login to get products from cart", 401)
    );
  }

  const { uid } = user;
  const cartRef = db.collection("users").doc(uid).collection("cart");

  const products = [];
  const querySnapshot = await cartRef.get();
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });

  res.status(200).json({
    success: true,
    products,
  });
});

// Update product in cart
export const updateProductInCart = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const db = getFirestore();
  const productCollection = db.collection("products");

  const product = await productCollection.doc(productId).get();
  if (product.empty) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  const user = getAuth(authClient);
  if (!user) {
    return next(
      new ErrorHandler("Please login to update product in cart", 401)
    );
  }

  const { uid } = user;
  const cartRef = db.collection("users").doc(uid).collection("cart");

  const productData = product.data();
  cartRef
    .doc(productId)
    .set(productData)
    .then(() => {
      console.log("Update product in cart successfully");
      res.status(200).json({
        success: true,
        message: "Update product in cart successfully",
      });
    })
    .catch((error) => {
      console.log("Error when update product in cart:", error);
      return res.status(400).json(error);
    });
});

// Get display mode
export const getDisplayMode = catchAsync(async (req, res, next) => {
  const db = getFirestore();
  db.collection("display-mode")
    .get()
    .then((querySnapshot) => {
      const modes = [];
      querySnapshot.forEach((doc) => {
        modes.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json({
        success: true,
        displayMode: modes,
      });
    });
});
