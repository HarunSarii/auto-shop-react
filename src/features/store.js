import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/SearchSlice";
import filterReducer from "./slices/FilterSlice";
import cartReducer from "./slices/CartSlice";
import productReducer from "./slices/ProductSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
