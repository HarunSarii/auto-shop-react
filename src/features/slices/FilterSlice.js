import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBrands: [],
  selectedModels: [],
  sortBy: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addSelectedBrand: (state, action) => {
      const brand = action.payload;
      state.selectedBrands.push(brand);
    },
    removeSelectedBrand: (state, action) => {
      const brand = action.payload;
      state.selectedBrands = state.selectedBrands.filter(
        (item) => item !== brand
      );
    },
    addSelectedModel: (state, action) => {
      const model = action.payload;
      state.selectedModels.push(model);
    },
    removeSelectedModel: (state, action) => {
      const model = action.payload;
      state.selectedModels = state.selectedModels.filter(
        (item) => item !== model
      );
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  addSelectedBrand,
  removeSelectedBrand,
  addSelectedModel,
  removeSelectedModel,
  setSortBy,
} = filterSlice.actions;

export default filterSlice.reducer;
