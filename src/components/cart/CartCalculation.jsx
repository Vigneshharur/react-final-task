import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CartCalculation({ cartProducts }) {
  let totalAmount = 0;
  const navigate = useNavigate();
  const products = useSelector((state) => state.product.products);

  cartProducts.forEach((cartProduct) => {
    products.forEach((product) => {
      if (product.id === cartProduct.productId) {
        totalAmount += cartProduct.quantity * product.price;
        return;
      }
    });
  });

  function handleCheckout() {
    navigate("/checkout");
  }

  const taxAmount = totalAmount * 0.12;
  const shippingCharge = 100;

  const total = totalAmount + taxAmount + shippingCharge;
  return (
    <div className="cart-calc">
      <h3>Cart Summary</h3>
      <p>
        <span>Purchase amount:&nbsp;</span> ₹{totalAmount}
      </p>
      <p>
        <span>Tax(12%): &emsp;&emsp;&emsp;&emsp;</span> ₹{taxAmount}
      </p>
      <p>
        <span>Shipping charge:&emsp;</span> ₹{shippingCharge}
      </p>
      <p>
        <span>Total amount:&emsp;&emsp;&nbsp;&nbsp;</span> ₹{total}
      </p>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
