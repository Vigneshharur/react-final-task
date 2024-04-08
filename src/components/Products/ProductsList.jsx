import { useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import "./ProductsList.css";
import { useEffect, useState } from "react";

export default function ProductsList() {
  const user = useSelector((state) => state.auth.credential.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //     return;
  //   }

  //   if (!checkValidLogin()) {
  //     navigate("/logout");
  //     return;
  //   }
  // });
  let products = useSelector((state) => state.product.products);
  const [displayProducts, setDisplayProducts] = useState([]);
  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setDisplayProducts(
      products.filter((product) => product.title.toLowerCase().includes(value))
    );
  }

  if (products.length === 0) {
    return <h2 className="products-list__fallback">Found no products</h2>;
  }

  return (
    <div className="products-list">
      <div className="products">
        {displayProducts.map((product) => {
          if (product.quantity > 0) {
            return <ProductItem key={product.id} product={product} />;
          }
        })}
      </div>
      <input placeholder="Search...." onChange={handleSearchChange} />
    </div>
  );
}
