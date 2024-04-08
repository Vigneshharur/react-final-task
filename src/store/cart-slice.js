import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    changed: true,
  },
  reducers: {
    addItemToCart(state, action) {
      let newCart = action.payload;
      let availableUser = false;
      const updatedCart = state.cartItems.map((cart) => {
        if (cart.user === newCart.user) {
          const products = cart.products;
          let availableProduct = false;
          const updatedProducts = products.map((product) => {
            if (product.productId === newCart.productId) {
              availableProduct = true;
              return { ...product, quantity: product.quantity + 1 };
            }
            return product;
          });
          availableUser = true;
          if (availableProduct) {
            return { ...cart, products: updatedProducts };
          } else {
            const product = {
              productId: newCart.productId,
              quantity: 1,
            };
            let temp = [...products];
            temp.push(product);
            return { ...cart, products: temp };
          }
        }
        return cart;
      });

      if (availableUser) {
        state.cartItems = updatedCart;
      } else {
        const cartItem = {
          id: newCart.id,
          user: newCart.user,
          products: [
            {
              productId: newCart.productId,
              quantity: 1,
            },
          ],
        };
        newCart.quantity = 1;
        state.cartItems.push(cartItem);
      }
      state.changed = true;
    },
    removeCartItem(state, action) {
      let removeCartDetails = action.payload;

      const updatedCart = state.cartItems
        .map((cart) => {
          if (cart.user === removeCartDetails.user) {
            const products = cart.products;
            const updatedProducts = products
              .map((product) => {
                if (product.productId === removeCartDetails.productId) {
                  if (product.quantity > 1) {
                    return { ...product, quantity: product.quantity - 1 };
                  } else {
                    return null;
                  }
                }
                return product;
              })
              .filter((products) => products !== null);
            if (updatedProducts.length > 0) {
              return {
                ...cart,
                products: updatedProducts,
              };
            } else {
              return null;
            }
          }
          return cart;
        })
        .filter((cart) => cart !== null);

      state.cartItems = updatedCart;
      state.changed = true;
    },
    removeUserCart(state, action) {
      const user = action.payload;
      state.cartItems = state.cartItems.filter((cart) => cart.user !== user);
      state.changed = true;
    },
    replaceCart(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
