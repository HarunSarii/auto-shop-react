import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "./Filter";

describe("Filter Component", () => {
  const mockList = ["Option 1", "Option 2", "Option 3"];
  const mockSelectedItems = [];
  const mockOnInput = jest.fn();

  it("renders correctly", () => {
    render(
      <Filter
        list={mockList}
        selectedItems={mockSelectedItems}
        onInput={mockOnInput}
        type="checkbox"
      />
    );

    const checkboxOptions = screen.getAllByRole("checkbox");
    expect(checkboxOptions).toHaveLength(mockList.length);

    mockList.forEach((item, index) => {
      const label = screen.getByText(item);
      expect(label).toBeInTheDocument();
    });
  });

  it("handles checkbox change", () => {
    render(
      <Filter
        list={mockList}
        selectedItems={mockSelectedItems}
        onInput={mockOnInput}
        type="checkbox"
      />
    );

    const checkboxOptions = screen.getAllByRole("checkbox");

    fireEvent.click(checkboxOptions[0]);

    expect(mockOnInput).toHaveBeenCalledWith([mockList[0]]);
  });
});
