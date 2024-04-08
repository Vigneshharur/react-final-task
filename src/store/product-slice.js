import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    changed: false,
  },
  reducers: {
    addProduct(state, action) {
      const newProduct = action.payload;
      state.products.push(newProduct);
      state.changed = true;
    },
    replaceProducts(state, action) {
      state.products = action.payload;
    },
    updateProduct(state, action) {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
      state.changed = true;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
