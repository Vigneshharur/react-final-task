import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { checkValidLogin } from "../../http";
import { useEffect } from "react";
import { cartActions } from "../../store/cart-slice";
import { productActions } from "../../store/product-slice";

export default function ProductDetails() {
  const credential = useSelector((state) => state.auth.credential);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!credential.user) {
  //     navigate("/login");
  //     return;
  //   }

  //   if (!checkValidLogin()) {
  //     navigate("/logout");
  //     return;
  //   }
  // });
  const { productId } = useParams();

  const products = useSelector((state) => state.product.products);
  let seletctedProduct;
  if (location.state) {
    seletctedProduct = location.state;
  } else {
    const tempProduct = products.filter((product) => product.id == productId);
    seletctedProduct = tempProduct.length === 1 ? tempProduct[0] : undefined;
  }

  function cartClickHandler() {
    if (!credential.user) {
      navigate("/login");
      return;
    }
    const id = Math.random();
    const newCart = {
      id,
      productId: Number(productId),
      user: credential.user,
    };
    dispatch(cartActions.addItemToCart(newCart));
    dispatch(
      productActions.updateProduct({
        ...seletctedProduct,
        quantity: seletctedProduct.quantity - 1,
      })
    );
    navigate("/cart");
  }

  return (
    seletctedProduct && (
      <>
        <div id="product-view">
          <ol>
            <li>
              <span>Title: </span>
              {seletctedProduct.title}
            </li>
            <li>
              <span>Price: </span>
              {seletctedProduct.price}
            </li>
            <li>
              <span>Mand In: </span>
              {seletctedProduct.madeIn}
            </li>
            <li>
              <span>Available Quantity: </span>
              {seletctedProduct.quantity}
            </li>
            <br />
            <li>
              <span>Description: </span>
              {seletctedProduct.description}
            </li>
          </ol>
          <div className="product-image">
            <img src={seletctedProduct.image} />
          </div>
        </div>
        <button className="pd-cart" onClick={cartClickHandler}>
          Add to Cart
        </button>
      </>
    )
  );
}
