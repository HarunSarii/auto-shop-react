import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/SearchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});
