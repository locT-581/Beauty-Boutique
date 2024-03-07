import axios from "axios";

const addEmptyBlog = async ({ title }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/blog/add", { title }, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const updateBlog = async (blog) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      "/api/v1/blog/update/" + blog.id,
      blog,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

/**
 *
 * @param {*} blogId ID of the blog to be deleted
 * @returns {Promise} Promise object represents the data of the deleted blog
 */
const deleteBlog = async (blogId) => {
  try {
    const { data } = await axios.delete(`/api/v1/blog/delete/${blogId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// Delete many blogs
const deleteManyBlogs = async ({ ids }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(`/api/v1/blog/delete-many`, {
      data: { ids },
      config,
    });
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// get all blog
const getAllBlog = async () => {
  try {
    const { data } = await axios.get("/api/v1/blog/get-all");
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
// get blog by id
const getBlogById = async (id) => {
  try {
    const { data } = await axios.get(`/api/v1/blog/get/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Get products
export const getBlogs = async ({ page, limit, search }) => {
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
      `/api/v1/blog/get?${pageQ}${limitQ}${searchQ}`,
      config
    );
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const blogAPI = {
  addEmptyBlog,
  updateBlog,
  getAllBlog,
  getBlogById,
  getBlogs,
  deleteBlog,
  deleteManyBlogs,
};
export default blogAPI;
