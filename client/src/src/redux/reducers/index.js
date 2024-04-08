import { combineReducers } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import uiSlice from "./uiSlice";
import userSlice from "./userSlice";
import blogSlice from "./blogSlice";
import productSlice from "./productSlice";

export default combineReducers({
  uiSlice,
  authSlice,
  userSlice,
  blogSlice,
  productSlice,
});
