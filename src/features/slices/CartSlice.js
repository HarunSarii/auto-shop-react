import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isCartVisible: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems
        .map((item) => {
          if (item.id === itemId && item.quantity > 0) {
            item.quantity -= 1;
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    },
    toggleCart: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export const { addToCart, removeFromCart, toggleCart } = cartSlice.actions;

export default cartSlice.reducer;
