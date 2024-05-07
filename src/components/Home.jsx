import {useSelector} from "react-redux";
import ProductItem from "./Products/ProductItem";
import {useEffect, useState} from "react";

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
  const [selectedPrizeRanges, setSelectedPrizeRanges] = useState({
    belowThousand: false,
    oneToFive: false,
    fiveToTen: false,
    tenToFifty: false,
    aboveFifty: false,
  });

  let min = 100000;
  let max = 0;

  useEffect(() => {
    if (
      selectedPrizeRanges.belowThousand ||
      selectedPrizeRanges.oneToFive ||
      selectedPrizeRanges.fiveToTen ||
      selectedPrizeRanges.tenToFifty ||
      selectedPrizeRanges.aboveFifty
    ) {
      if (selectedPrizeRanges.belowThousand) {
        min = 0;
        max = 999;
      }
      if (selectedPrizeRanges.oneToFive) {
        min = Math.min(min, 1000);
        max = Math.max(max, 5000);
      }
      if (selectedPrizeRanges.fiveToTen) {
        min = Math.min(min, 5001);
        max = Math.max(max, 10000);
      }
      if (selectedPrizeRanges.tenToFifty) {
        min = Math.min(min, 10001);
        max = Math.max(max, 50000);
      }
      if (selectedPrizeRanges.aboveFifty) {
        min = Math.min(min, 50001);
        max = undefined;
      }

      setDisplayProducts(
        recentProducts.filter((product) => {
          console.log(product.price + " - " + min + " - " + max);
          if (!max) {
            if (product.price >= min) return product;
          } else if (min <= product.price && product.price <= max) {
            return product;
          }
        })
      );
    } else {
      setDisplayProducts(recentProducts);
    }
  }, [selectedPrizeRanges]);

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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedPrizeRanges({
      ...selectedPrizeRanges,
      [name]: checked,
    });
  };

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
      <div className="search-filter">
        <input placeholder="Search...." onChange={handleSearchChange} />
        <h3>Filter Products:</h3>
        <div className="filter-products">
          <input
            name="belowThousand"
            type="checkbox"
            checked={selectedPrizeRanges.belowThousand}
            onChange={handleCheckboxChange}
          />
          <span> Below 1000 </span>
          <input
            name="oneToFive"
            type="checkbox"
            checked={selectedPrizeRanges.oneToFive}
            onChange={handleCheckboxChange}
          />
          <span> 1000 - 5000 </span>
          <input
            name="fiveToTen"
            type="checkbox"
            checked={selectedPrizeRanges.fiveToTen}
            onChange={handleCheckboxChange}
          />
          <span> 5001 - 10000 </span>
          <input
            name="tenToFifty"
            type="checkbox"
            checked={selectedPrizeRanges.tenToFifty}
            onChange={handleCheckboxChange}
          />
          <span> 10001 - 50000 </span>
          <input
            name="aboveFifty"
            type="checkbox"
            checked={selectedPrizeRanges.aboveFifty}
            onChange={handleCheckboxChange}
          />
          <span> Above 50000 </span>
        </div>
      </div>
    </div>
  );
}
