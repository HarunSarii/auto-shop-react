import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Product from "./Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/slices/CartSlice";

jest.mock("react-redux");
const product = {
  createdAt: "2023-07-17T07:21:02.529Z",
  name: "Bentley Focus",
  image: "https://loremflickr.com/640/480/food",
  price: "51.00",
  description: "Quasi adipisci sint veniam delectus...",
  model: "CTS",
  brand: "Lamborghini",
  id: "1",
};

test("renders product details correctly", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  render(
    <MemoryRouter>
      <Product product={product} />
    </MemoryRouter>
  );

  screen.getByText("Bentley Focus");
  screen.getByText("51.00₺");
});

test("clicking 'Add to Cart' button dispatches addToCart action", () => {
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  render(
    <MemoryRouter>
      <Product product={product} />
    </MemoryRouter>
  );

  const addToCartButton = screen.getByText("Add to Cart");
  fireEvent.click(addToCartButton);

  expect(mockDispatch).toHaveBeenCalledWith(addToCart(product));
});
