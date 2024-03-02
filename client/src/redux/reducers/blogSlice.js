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

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (blogId, thunkAPI) => {
    const data = await blogAPI.deleteBlog(blogId);
    return data;
  }
);

const blogSlice = createSlice({
  name: "blogSlice",
  initialState: {
    blog: {},
    loading: false,
    isUpdated: false,
    error: "",
    message: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
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
        state.blog = action.payload.blog;
      })
      .addCase(addEmptyBlog.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success; // success: true or false
        state.error = action.error.message;
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
        state.message = "";
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isUpdated = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
        state.message = "";
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = blogSlice;
export const { clearError, updateReset } = actions;
export default reducer;
