import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ThankYouModal from "./ThankYouModal";
import { cartActions } from "../store/cart-slice";

export default function OrderConfirmation() {
  const user = useSelector((state) => state.auth.credential.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);

  const [verifyPolicies, setVerifyPolicies] = useState({
    termsConditions: false,
    privacyPolicy: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const dialog = useRef();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    //   if (!checkValidLogin()) {
    //     navigate("/logout");
    //     return;
    //   }
  });
  let totalAmount = 0;
  let userCart;
  let productDetails = [];
  let others = [];
  let productAvailable = false;
  try {
    const userCartItems = cartItems.filter((cart) => cart.user === user);
    productAvailable = userCartItems.length > 0;

    if (userCartItems.length === 1) {
      userCart = userCartItems[0];
    }
    userCart.products.forEach((cartProduct) => {
      products.forEach((product) => {
        if (product.id === cartProduct.productId) {
          productDetails.push(
            <li key={product.id}>
              {product.title}: {product.price} * {cartProduct.quantity} ={" "}
              {product.price * cartProduct.quantity}
            </li>
          );
          totalAmount += cartProduct.quantity * product.price;
          return;
        }
      });
    });

    const taxAmount = totalAmount * 0.12;
    const shippingCharge = 100;
    const total = totalAmount + taxAmount + shippingCharge;

    others.push();
    others.push(
      <li key={Math.random()}>
        Tax(12%) + Shipping charge = {(taxAmount + shippingCharge).toFixed(3)}
      </li>
    );
    others.push(<li key={Math.random()}>Total Amount = {total.toFixed(3)}</li>);
  } catch {}

  const currentDate = new Date();
  const fourDaysAfter = new Date();
  fourDaysAfter.setDate(currentDate.getDate() + 4);

  function handleOrderConfirm() {
    setSubmitted(true);
    if (verifyPolicies.privacyPolicy && verifyPolicies.termsConditions) {
      dialog.current.open();
      dispatch(cartActions.removeUserCart(user));
    }
  }

  function termsClick() {
    setVerifyPolicies((prev) => {
      return { ...prev, termsConditions: !prev.termsConditions };
    });
  }

  function privacyClick() {
    setVerifyPolicies((prev) => {
      return { ...prev, privacyPolicy: !prev.privacyPolicy };
    });
  }

  return (
    <>
      <ThankYouModal ref={dialog} />
      {!productAvailable && <h2 className="empty">No Product added to Cart</h2>}
      {productAvailable && (
        <div className="order-confirm">
          <h3>Order Confirmation</h3>
          <div>
            <h4>Products:</h4>
            <ol>{productDetails}</ol>
            <h4>Others:</h4>
            <ol>{others}</ol>
            <h4>Order details:</h4>
            <ol>
              <li>
                Order number:{" "}
                {Math.floor(Math.random() * (500000 - 10000 + 1) + 10000)}
              </li>
              <li>Deliver Date: {fourDaysAfter.toLocaleDateString()}</li>
            </ol>
          </div>
          <input
            type="checkbox"
            onClick={termsClick}
            value={verifyPolicies.termsConditions}
          />{" "}
          <label>Terms & Conditions</label>
          {!verifyPolicies.termsConditions && submitted && (
            <span style={{ marginLeft: "10px" }} className="error">
              Please verify Terms and Conditions
            </span>
          )}
          <br />
          <input
            type="checkbox"
            onClick={privacyClick}
            value={verifyPolicies.privacyPolicy}
          />{" "}
          <label>Privacy Policy</label>{" "}
          {!verifyPolicies.privacyPolicy && submitted && (
            <span style={{ marginLeft: "10px" }} className="error">
              Please verify the Privacy Policy
            </span>
          )}{" "}
          <br />
          <br />
          <button onClick={handleOrderConfirm}>Confirm Order</button>
        </div>
      )}
    </>
  );
}
