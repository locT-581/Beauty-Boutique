import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import productAPI from "../../apis/productAPI.js";
/**
 * return { success: true, product[]}
 */
export const getAllProductAsync = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    const data = await productAPI.getAllProduct();
    return data;
  }
);

// Update product
export const updateProductAsync = createAsyncThunk(
  "product/updateProduct",
  async (product) => {
    const { id, ...updateFields } = product;
    const data = await productAPI.updateProduct(id, updateFields);
    return data;
  }
);

export const getProductsAsync = createAsyncThunk(
  "product/getProducts",
  async ({ page, limit, search }) => {
    const data = await productAPI.getProducts({ page, limit, search });
    return data;
  }
);

// Get product by id
export const getProductByIdAsync = createAsyncThunk(
  "product/getProductById",
  async (id) => {
    const data = await productAPI.getProductById(id);
    return data;
  }
);

// Delete product
export const deleteProductAsync = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    const data = await productAPI.deleteProduct(id);
    return data;
  }
);

// Delete many products
export const deleteManyProductsAsync = createAsyncThunk(
  "product/deleteManyProducts",
  async ({ ids }) => {
    const data = await productAPI.deleteManyProducts({ ids });
    return data;
  }
);

// Add empty product
export const addEmptyProductAsync = createAsyncThunk(
  "product/addEmptyProduct",
  async (product) => {
    const data = await productAPI.addEmptyProduct(product);
    return data;
  }
);

// Add product to cart
export const addProductToCartAsync = createAsyncThunk(
  "product/addProductToCart",
  async (productId) => {
    const data = await productAPI.addProductToCart(productId);
    return data;
  }
);

// Remove product from cart
export const removeProductsFromCartAsync = createAsyncThunk(
  "product/removeProductFromCart",
  async (productIds) => {
    const data = await productAPI.removeProductFromCart(productIds);
    return data;
  }
);

// Get all products from cart
export const getProductsFromCartAsync = createAsyncThunk(
  "product/getProductsFromCart",
  async () => {
    const data = await productAPI.getAllProductsFromCart();
    return data;
  }
);

// Update product in cart
export const updateProductInCartAsync = createAsyncThunk(
  "product/updateProductInCart",
  async ({ id, quantity }) => {
    const data = await productAPI.updateProductInCart(id, quantity);
    return data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productFromCart: [],
    currentProduct: {},
    isUpdating: false,
    loading: false,
    error: "",
    message: "",
    isNewOrder: false,
  },

  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    clearMessage: (state) => {
      state.message = "";
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = {};
    },
    alertNewOrder: (state) => {
      state.isNewOrder = true;
    },
    clearNewOrder: (state) => {
      state.isNewOrder = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllProductAsync.pending, (state) => {
        state.loading = true;
        state.isUpdating = false;
      })
      .addCase(getAllProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = "";
      })
      .addCase(getAllProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
        state.isUpdating = true;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.isUpdating = false;
        state.currentProduct = action.payload.product;
        state.message = action.payload.message;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.message = "";
      })
      .addCase(getProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.error = "";
      })
      .addCase(getProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteManyProductsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteManyProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        state.message = action.payload.message;
      })
      .addCase(deleteManyProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEmptyProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmptyProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.product;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(addEmptyProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload.product;
        state.error = "";
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProductToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = "";
        state.isUpdating = true;
      })
      .addCase(addProductToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isUpdating = false;
      })
      .addCase(getProductsFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.productFromCart = action.payload.products;
        state.error = "";
        state.isUpdating = false;
      })
      .addCase(getProductsFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeProductsFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeProductsFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = "";
        state.isUpdating = true;
      })
      .addCase(removeProductsFromCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isUpdating = false;
      })
      .addCase(updateProductInCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductInCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = "";
        state.isUpdating = true;
      })
      .addCase(updateProductInCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.isUpdating = false;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = productSlice;
export const {
  clearError,
  clearMessage,
  clearCurrentProduct,
  alertNewOrder,
  clearNewOrder,
} = actions;
export default reducer;
