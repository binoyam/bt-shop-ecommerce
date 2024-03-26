import { Link } from "react-router-dom";
import CartIcon from "../../Assets/Images/icon-cart-btn.svg";
import "./TopProducts.css";

function TopProducts({ product, addToCart }) {
  return (
    <article className="top-product-box" key={product.id}>
      <h3 className="top-product-title">{product.title.slice(0, 13)}</h3>
      <img
        className="top-product-image"
        src={product.image}
        alt={product.title}
      />
      <span className="top-product-price">${product.price}</span>
      <button
        onClick={() => addToCart(product)}
        className="top-add-to-cart-btn"
      >
        <img src={CartIcon} alt="Cart" /> BUY NOW
      </button>

      <p className="top-product-description">
        {product.description.slice(0, 40)}...
      </p>

      <Link className="top-view-details-link" to={`/products/${product.id}`}>
        <button className="top-view-more-btn">View Details</button>
      </Link>
    </article>
  );
}
export default TopProducts;
