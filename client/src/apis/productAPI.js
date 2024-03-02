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

const useAPI = {
  getAllProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  deleteManyProducts,
};

export default useAPI;
