import { fetchCartsFromDB, saveCartDetails } from "../http";
import { cartActions } from "./cart-slice";

export function fetchCarts() {
  return async (dispatch) => {
    try {
      const cartData = await fetchCartsFromDB();
      if (cartData) {
        dispatch(cartActions.replaceCart(cartData));
      }
    } catch (error) {
      if (error === TypeError) {
        fetchCarts();
      }
      alert("ETHO ERROR!!");
    }
  };
}

export function sendCarts(cart) {
  return () => {
    try {
      saveCartDetails(cart);
    } catch (e) {
      alert("ETHO Error");
    }
  };
}
