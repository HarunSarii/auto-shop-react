import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import axios from "axios";
import configureMockStore from "redux-mock-store";

import CarDetailPage from "./CarDetailPage";

jest.mock("axios");

const mockStore = configureMockStore();

describe("CarDetailPage Component", () => {
  it("renders product details correctly", async () => {
    const product = {
      id: "1",
      name: "Test Product",
      model: "Test Model",
      price: 123.45,
      image: "test-image.jpg",
      description: "This is a test product description.",
    };

    axios.get.mockResolvedValueOnce({ data: product });

    const store = mockStore({
      cart: {
        cartItems: [],
        isCartVisible: false,
      },
    });

    render(
      <Provider store={store}>
        <CarDetailPage />
      </Provider>
    );

    const findByTextFlex = (text) => {
      return screen.findByText((content, element) => {
        const cleanContent = content.replace(/\s+/g, " ");
        return cleanContent.includes(text);
      });
    };

    const productName = await findByTextFlex(product.name);
    expect(productName).toBeInTheDocument();
  });
});
