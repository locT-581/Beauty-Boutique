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
  console.log("blog:", blog);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put("/api/v1/blog/update", blog, config);
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
    const { data } = await axios.delete(`/api/v1/blog/${blogId}`);
    return data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const blogAPI = {
  addEmptyBlog,
  updateBlog,
  deleteBlog,
};
export default blogAPI;
