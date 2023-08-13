import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/SearchSlice";
import filterReducer from "./slices/FilterSlice";
import cartReducer from "../features/slices/CartSlice"; // Import the cart slice

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});
