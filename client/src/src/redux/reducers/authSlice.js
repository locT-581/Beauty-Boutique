import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userAPI from "../../apis/userAPI.js";
/**
 * return { success: true, user}
 */
export const userLoginAsync = createAsyncThunk(
  "auth/signin",
  async ({ email, password }, thunkAPI) => {
    const data = await userAPI.signin({ email, password });
    return data;
  }
);
/**
 * return { success: true, user}
 */
export const userSignupAsync = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    const data = await userAPI.signup(userData);
    return data;
  }
);

export const loadUserAsync = createAsyncThunk("auth/loadUser", async () => {
  const data = await userAPI.loadUser();
  return data.user;
});

export const userLogoutAsync = createAsyncThunk(
  "auth/userLogoutAsync",
  async () => {
    const data = await userAPI.signout();
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
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
      .addCase(userLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = "Đăng nhập thành công!";
        state.error = "";
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
        state.message = "";
      })
      .addCase(userSignupAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignupAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = "Đăng kí thành công!";
      })
      .addCase(userSignupAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.error.message;
      })
      .addCase(loadUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        // state.error = action.error.message;
      })
      .addCase(userLogoutAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogoutAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(userLogoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = authSlice;
export const { clearError, clearMessage } = actions;
export default reducer;
