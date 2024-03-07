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

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    currentProduct: {},
    loading: false,
    error: "",
    message: "",
  },

  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllProductAsync.pending, (state) => {
        state.loading = true;
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
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
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
      });
  },
});

const { actions, reducer } = productSlice;
export const { clearError, clearMessage } = actions;
export default reducer;
