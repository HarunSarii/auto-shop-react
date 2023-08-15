import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import searchReducer from "./slices/SearchSlice";
import filterReducer from "./slices/FilterSlice";
import cartReducer from "./slices/CartSlice";
import productReducer from "./slices/ProductSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["isCartVisible"],
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterReducer,
    cart: persistedReducer,
    product: productReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
