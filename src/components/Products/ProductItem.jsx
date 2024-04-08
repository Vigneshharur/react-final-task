import { useDispatch, useSelector } from "react-redux";
import Card from "../UI/Card.jsx";
import "./ProductItem.css";
import { cartActions } from "../../store/cart-slice.js";
import { productActions } from "../../store/product-slice.js";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.credential.user);

  const isProductAvailable = product.quantity > 0;

  function cartClickHandler(e) {
    if (!user) {
      navigate("/login");
      return;
    }
    e.preventDefault();
    const id = Math.random();
    const newCart = {
      id,
      productId: product.id,
      user,
    };
    dispatch(cartActions.addItemToCart(newCart));
    dispatch(
      productActions.updateProduct({
        ...product,
        quantity: product.quantity - 1,
      })
    );
  }
  function handleProductClick() {
    navigate("/product/" + product.id, { state: product });
  }

  return (
    <>
      <Card className="product-item">
        <div className="product-item__description">
          <h2 onClick={handleProductClick}>{product.title}</h2>
          <div className="product-item__price">₹ {product.price}</div>
        </div>
        <div className="product-item-quantity">{product.quantity}</div>
        <button onClick={cartClickHandler} disabled={!isProductAvailable}>
          Add to Cart
        </button>
        &emsp;
      </Card>
    </>
  );
};

export default ProductItem;
