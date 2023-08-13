import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/SearchSlice";
import filterReducer from "./slices/FilterSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
  },
});
