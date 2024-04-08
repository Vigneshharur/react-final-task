import { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/auth/Profile";
import AddProduct from "./components/Products/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, sendProducts } from "./store/product-actions";
import ProductsList from "./components/Products/ProductsList";
import { fetchCarts, sendCarts } from "./store/cart-actions";
import Cart from "./components/cart/Cart";
import RootLayout from "./components/layout/RootLayout";
import { fetchUsers, sendUsers } from "./store/user-actions";
import Logout from "./components/auth/Logout";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";

let isInitial = true;

function App() {
  const product = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCarts());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!isInitial) {
      if (product.changed) {
        dispatch(sendProducts(product.products));
      }
      if (cart.changed) {
        dispatch(sendCarts(cart.cartItems));
      }
      if (user.changed) {
        dispatch(sendUsers(user.users));
      }
    }
    isInitial = false;
  }, [product, dispatch, user, cart]);

  const routerJSX = (
    <Route path="/" element={<RootLayout />}>
      <Route path="" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="products" element={<ProductsList />} />
      <Route path="product/:productId?" element={<ProductDetails />} />
      <Route path="add-product" element={<AddProduct />} />
      <Route path="cart" element={<Cart />} />
      <Route path="logout" element={<Logout />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="confirm-order" element={<OrderConfirmation />} />
    </Route>
  );

  const routes = createRoutesFromElements(routerJSX);
  const router = createBrowserRouter(routes);

  return (
    <div className="app">
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
