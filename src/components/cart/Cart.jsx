import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./Cart.css";
import CartCalculation from "./CartCalculation";

export default function Cart() {
  const user = useSelector((state) => state.auth.credential.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // if (!checkValidLogin()) {
    //   navigate("/logout");
    //   return;
    // }
  }, [user]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const userCartItems = cartItems.filter((cart) => cart.user === user);
  const productAvailable = userCartItems.length > 0;

  let userCart;
  if (userCartItems.length === 1) {
    userCart = userCartItems[0];
  }

  return (
    <div className="cart">
      {!productAvailable && <h2 className="empty">No Product added to Cart</h2>}
      {productAvailable && (
        <>
          <ul className="cart-items">
            {userCart.products.map((product) => {
              return (
                <CartItem
                  key={product.productId}
                  quantity={product.quantity}
                  productId={product.productId}
                  user={user}
                />
              );
            })}
          </ul>
          <CartCalculation cartProducts={userCart.products} />
        </>
      )}
    </div>
  );
}
