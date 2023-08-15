import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import Navbar from "./Navbar";

const mockStore = configureMockStore();

describe("Navbar Component", () => {
  it("renders correctly", () => {
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
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const brandLink = screen.getByText("Eteration");
    const searchInput = screen.getByPlaceholderText("Search");
    const cartIcon = screen.getByTestId("cart-icon");
    const userIcon = screen.getByTestId("user-icon");

    expect(brandLink).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(cartIcon).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
  });

  it("handles cart icon click correctly", () => {
    const store = mockStore({
      cart: {
        cartItems: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const cartIcon = screen.getByTestId("cart-icon");
    fireEvent.click(cartIcon);
  });
});
