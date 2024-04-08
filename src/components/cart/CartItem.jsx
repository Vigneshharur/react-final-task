import { useDispatch, useSelector } from "react-redux";
import classes from "./CartItem.module.css";
import { cartActions } from "../../store/cart-slice";
import { productActions } from "../../store/product-slice";
import { useNavigate } from "react-router-dom";

const CartItem = ({ quantity, productId, user }) => {
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let product = products.filter((product) => {
    return product.id === productId;
  });
  let total = 0;
  if (product.length === 1) {
    product = product[0];
    total = product.price * quantity;
  }

  function removeItemHandler() {
    dispatch(cartActions.removeCartItem({ user, productId }));
    dispatch(
      productActions.updateProduct({
        ...product,
        quantity: product.quantity + 1,
      })
    );
  }

  function addItemHandler() {
    if (product.quantity > 0) {
      dispatch(cartActions.addItemToCart({ user, productId }));
      dispatch(
        productActions.updateProduct({
          ...product,
          quantity: product.quantity - 1,
        })
      );
    }
  }
  function handleCartItemClick() {
    navigate("/product/" + productId, { state: product });
  }

  return (
    <li className={classes.item}>
      <header>
        <h3 onClick={handleCartItemClick}>{product.title}</h3>
        <div className={classes.price}>
          ₹{total}
          <span className={classes.itemprice}>(₹{product.price}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          <span>x{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
