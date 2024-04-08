import { NavLink, useNavigate } from "react-router-dom";
import "../../assets/style.css";
import { useSelector } from "react-redux";

export default function Header() {
  const credential = useSelector((state) => state.auth.credential);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userCartItems = cartItems.filter(
    (cart) => cart.user === credential.user
  );

  let totalQuantity = undefined;
  if (userCartItems.length === 1) {
    totalQuantity = 0;
    const userCart = userCartItems[0];
    userCart.products.forEach((product) => (totalQuantity += product.quantity));
  }

  return (
    <header>
      <nav className="front">
        <span>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "active-nav" : undefined;
            }}
          >
            Home
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active-nav" : undefined)}
          >
            Products
          </NavLink>
        </span>
        <span>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? "active-nav" : undefined)}
          >
            Cart {totalQuantity && `(${totalQuantity})`}
          </NavLink>
        </span>

        {credential.isAdmin && (
          <span>
            <NavLink
              to="/add-product"
              className={({ isActive }) =>
                isActive ? "active-nav" : undefined
              }
            >
              Add Product
            </NavLink>
          </span>
        )}
      </nav>

      <nav className="back">
        {credential.user ? (
          <>
            <span>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "active-nav" : undefined
                }
              >
                Profile
              </NavLink>
            </span>
            <span>
              <NavLink
                to="/logout"
                className={({ isActive }) =>
                  isActive ? "active-nav" : undefined
                }
              >
                Logout
              </NavLink>
            </span>
          </>
        ) : (
          <>
            <span>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "active-nav" : undefined
                }
              >
                Login
              </NavLink>
            </span>
            <span>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "active-nav" : undefined
                }
              >
                Sign up
              </NavLink>
            </span>
          </>
        )}
      </nav>
    </header>
  );
}
