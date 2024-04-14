import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["uiSlice/showBackDrop"],
        // Ignore these paths in the state
        ignoredPaths: ["uiSlice.element"],
      },
    }),
});
export default store;
