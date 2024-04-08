import { useSelector } from "react-redux";
import ProductItem from "./Products/ProductItem";
import { checkValidLogin } from "../http";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {
  // const user = useSelector((state) => state.auth.credential.user);
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

  const products = useSelector((state) => state.product.products);
  const [displayProducts, setDisplayProducts] = useState([]);

  let recentProducts;
  if (products.length <= 5) {
    recentProducts = products;
  } else {
    const tempProducts = [...products];
    tempProducts.sort((a, b) => b.addedTime - a.addedTime);
    recentProducts = tempProducts.slice(0, 5);
  }

  useEffect(() => {
    setDisplayProducts(recentProducts);
  }, [products]);

  function handleSearchChange(e) {
    const value = e.target.value.toLowerCase();
    setDisplayProducts(
      recentProducts.filter((product) =>
        product.title.toLowerCase().includes(value)
      )
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
