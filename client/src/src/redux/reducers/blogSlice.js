import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogAPI from "../../apis/blogAPI";

export const addEmptyBlog = createAsyncThunk(
  "blog/addEmptyBlog",
  async ({ title }, thunkAPI) => {
    const data = await blogAPI.addEmptyBlog({ title });
    return data;
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (blog, thunkAPI) => {
    const data = await blogAPI.updateBlog(blog);
    return data;
  }
);

// Get all blog
export const getAllBlog = createAsyncThunk("blog/getAllBlog", async () => {
  const data = await blogAPI.getAllBlog();
  return data;
});
// Get blog by id
export const getBlogById = createAsyncThunk("blog/getBlogById", async (id) => {
  const data = await blogAPI.getBlogById(id);
  return data;
});

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (blogId, thunkAPI) => {
    const data = await blogAPI.deleteBlog(blogId);
    return data;
  }
);
// Delete many products
export const deleteManyBlogs = createAsyncThunk(
  "blog/deleteManyBlogs",
  async ({ ids }) => {
    const data = await blogAPI.deleteManyBlogs({ ids });
    return data;
  }
);

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async ({ page, limit, search }) => {
    const data = await blogAPI.getBlogs({ page, limit, search });
    return data;
  }
);

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: {
    blogs: [],
    currentBlog: {},
    loading: false,
    isUpdated: false,
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
    clearCurrentBlog: (state) => {
      state.currentBlog = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addEmptyBlog.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(addEmptyBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success; // success: true or false
        state.currentBlog = action.payload.blog;
      })
      .addCase(addEmptyBlog.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isUpdated = action.payload.success;
        state.currentBlog = action.payload.blog;
        state.message = action.payload.message;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      })
      .addCase(getAllBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.message = action.payload.message;
      })
      .addCase(getAllBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getBlogById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload.blog;
        state.message = action.payload.message;
      })
      .addCase(getBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteManyBlogs.pending, (state) => {
        state.loading = true;
        state.message = "";
      })
      .addCase(deleteManyBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(deleteManyBlogs.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      })
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.message = action.payload.message;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = blogSlice;
export const { clearError, clearMessage, clearCurrentBlog } = actions;
export default reducer;
