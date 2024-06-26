import axios from "axios";

// Get all products
export const getAllProduct = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get("/api/v1/product/get-all", config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update product
export const updateProduct = async (id, updateFields) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/product/update/${id}`,
      updateFields,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get products
export const getProducts = async ({ page, limit, search }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const pageQ = page ? `&page=${page + 1}` : "";
    const limitQ = limit ? `&limit=${limit}` : "";
    const searchQ = search ? `&search=${search}` : "";

    const { data } = await axios.get(
      `/api/v1/product/get?${pageQ}${limitQ}${searchQ}`,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/v1/product/delete/${id}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Delete many products
export const deleteManyProducts = async ({ ids }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/product/delete-many`,
      { ids },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const addEmptyProduct = async (product = {}) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/product/upload",
      product,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get product by id
export const getProductById = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/v1/product/get/${id}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Add product to cart
export const addProductToCart = async (productId) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/product/add-to-cart/${productId}`,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get all products in cart
export const getAllProductsFromCart = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      "/api/v1/product/get-product-from-cart",
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Remove product from cart
export const removeProductFromCart = async (productIds) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/product/remove-from-cart`,
      { productIds },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Update product in cart
export const updateProductInCart = async (productId, quantity) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/product/update-product-in-cart/${productId}`,
      { quantity },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Create a new orders
export const createOrder = async ({ order }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/product/add-order",
      { order },
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const productAPI = {
  addEmptyProduct,
  getProducts,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
  addProductToCart,
  getAllProductsFromCart,
  removeProductFromCart,
  updateProductInCart,
  createOrder,
};

export default productAPI;
