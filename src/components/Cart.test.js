import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Cart from "./Cart";
import { addToCart, removeFromCart } from "../features/slices/CartSlice";

const mockStore = configureMockStore();

describe("Cart Component", () => {
  it("calls addToCart and removeFromCart actions correctly", () => {
    const cartItems = [
      {
        id: "1",
        name: "Product 1",
        price: 50,
        quantity: 2,
      },
    ];

    const store = mockStore({
      cart: {
        cartItems,
      },
    });

    render(
      <Provider store={store}>
        <Cart cartItems={cartItems} />
      </Provider>
    );

    const addToCartButton = screen.getByText("+");
    const removeFromCartButton = screen.getByText("−");

    fireEvent.click(addToCartButton);
    fireEvent.click(removeFromCartButton);

    const actions = store.getActions();
    const expectedActions = [addToCart(cartItems[0]), removeFromCart("1")];

    expect(actions).toEqual(expectedActions);
  });
});
