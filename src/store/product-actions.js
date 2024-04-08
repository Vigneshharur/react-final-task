import { fetchProductsFromDB, saveProductDetails } from "../http";
import { productActions } from "./product-slice";

export function fetchProducts() {
  return async (dispatch) => {
    try {
      const products = await fetchProductsFromDB();
      if (products) {
        dispatch(productActions.replaceProducts(products));
      }
    } catch (e) {
      alert("ETHO ERROR!!");
    }
  };
}

export function sendProducts(products) {
  return async (dispatch) => {
    try {
      saveProductDetails(products);
    } catch (e) {
      alert("ETHO ERROR!!");
    }
  };
}
