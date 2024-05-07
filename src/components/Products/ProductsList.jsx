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
  const [selectedPrizeRanges, setSelectedPrizeRanges] = useState({
    belowThousand: false,
    oneToFive: false,
    fiveToTen: false,
    tenToFifty: false,
    aboveFifty: false,
  });

  useEffect(() => {
    setDisplayProducts(products);
  }, [products]);

  useEffect(() => {
    if (
      selectedPrizeRanges.belowThousand ||
      selectedPrizeRanges.oneToFive ||
      selectedPrizeRanges.fiveToTen ||
      selectedPrizeRanges.tenToFifty ||
      selectedPrizeRanges.aboveFifty
    ) {
      setDisplayProducts(
        products.filter((product) => {
          switch (true) {
            case selectedPrizeRanges.belowThousand && product.price < 1000:
            case selectedPrizeRanges.oneToFive &&
              1000 <= product.price &&
              product.price <= 5000:
            case selectedPrizeRanges.fiveToTen &&
              5000 < product.price &&
              product.price <= 10000:
            case selectedPrizeRanges.tenToFifty &&
              10000 < product.price &&
              product.price <= 50000:
            case selectedPrizeRanges.aboveFifty && product.price > 50000:
              return product;
            default:
              return null;
          }
        })
      );
    } else {
      setDisplayProducts(products);
    }
  }, [selectedPrizeRanges]);

  function handleSearchChange(e) {

    const value = e.target.value.toLowerCase();
    setDisplayProducts(
      products.filter((product) => product.title.toLowerCase().includes(value))
    );
  }

  function handleClearFilters(){
    setSelectedPrizeRanges({
      belowThousand: false,
      oneToFive: false,
      fiveToTen: false,
      tenToFifty: false,
      aboveFifty: false,
    });
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
        <h3>
          Filter Products:{" "}
          <span className="clear" onClick={handleClearFilters}>
            Clear Filters
          </span>
        </h3>
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
          <span> Above 50000 </span> <br />
          <br />
        </div>
      </div>
    </div>
  );
}
