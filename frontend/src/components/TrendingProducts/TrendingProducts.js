import "./TrendingProducts.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopProducts from "./TopProducts";

function TrendingProducts({ products, addToCart }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topProducts, setTopProducts] = useState([]);
  /* SORT PRODUCTS BY RATING/ FROM HIGHEST RATED TO LOWEST RATED*/
  useEffect(() => {
    const sortedProducts = [...products].sort(
      (a, b) => b["rating.rate"] - a["rating.rate"]
    );
    /* TOP 5 HIGHEST RATED PRODUCTS */
    const top5Products = sortedProducts.slice(0, 5);
    setTopProducts(top5Products);
  }, [products]);

  /* SLIDE TO THE NEXT PRODUCT */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % topProducts.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [topProducts.length]);
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };
  return (
    <section className="trending-products-section">
      <h1 className="trending-header">Trending Products</h1>
      <div className="slide-wrapper">
        {topProducts.map((product, index) => (
          <div
            key={product.id}
            className={`slider-item ${index === currentSlide ? "active" : ""}`}
          >
            <h3 className="trending-product-title">
              {product.title.slice(0, 30)}
            </h3>
            <div className="rating">
              Customer rating:{" "}
              <span className="rating-value">{product["rating.rate"]}</span> / 5
            </div>
            <div className="img-div">
              <img src={product.image} alt="product" />
            </div>
            <span className="trending-price">${product.price}</span>
            <Link className="link" to={`/products/${product.id}`}>
              View Product
            </Link>
          </div>
        ))}
      </div>
      <div className="trending-products-list">
        {topProducts.map((product) => (
          <TopProducts
            key={product.id}
            product={product}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

export default TrendingProducts;
