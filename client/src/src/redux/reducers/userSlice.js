import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import userAPI from "../../apis/userAPI";

export const userUpdateProfileAsync = createAsyncThunk(
  "user/updateProfile",
  async (userData, thunkAPI) => {
    const data = await userAPI.updateProfile(userData);
    return data.success;
  }
);

export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async ({ email }, thunkAPI) => {
    const data = await userAPI.forgotPassword({ email });
    return data;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, thunkAPI) => {
    const data = await userAPI.resetPassword({ token, password });
    return data;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    loading: false,
    isUpdated: false,
    error: "",
    message: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    updateReset: (state) => {
      state.error = "";
      state.loading = false;
      state.isUpdated = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userUpdateProfileAsync.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
      })
      .addCase(userUpdateProfileAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isUpdated = action.payload; // success: true or false
      })
      .addCase(userUpdateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload; // success: true or false
        state.error = action.error.message;
      })
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
        state.message = "";
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isUpdated = action.payload.success;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.loading = true;
        state.isUpdated = false;
        state.message = "";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.isUpdated = action.payload.success;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = action.error.message;
      });
  },
});

const { actions, reducer } = userSlice;
export const { clearError, updateReset } = actions;
export default reducer;
