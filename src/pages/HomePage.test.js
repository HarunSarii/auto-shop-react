import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import HomePage from "./HomePage";

const mockStore = configureMockStore([thunk]);

describe("HomePage Component", () => {
  it("renders product details correctly", async () => {
    const product = {
      id: "1",
      name: "Test Product",
      model: "Test Model",
      price: 123.45,
      image: "test-image.jpg",
      description: "This is a test product description.",
    };

    const store = mockStore({
      cart: {
        cartItems: [],
        isCartVisible: false,
      },
      product: {
        products: [product],
      },
      filter: {
        selectedBrands: [],
        selectedModels: [],
        sortBy: "New to Old",
      },
      search: {
        searchQuery: "",
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>
    );

    const productName = await screen.findByText(product.name);
    const productModel = await screen.findByText(product.model);

    expect(productName).toBeInTheDocument();
    expect(productModel).toBeInTheDocument();
  });
});
