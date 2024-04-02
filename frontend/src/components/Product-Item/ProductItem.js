import { Link } from "react-router-dom";
import "./ProductItem.css";
import CartIcon from "../../Assets/Images/icon-cart-btn.svg";
import removeIcon from "../../Assets/Images/close_btn.svg";

function ProductItem({ product, addToCart, adminMode, handleRemoveProduct }) {
  // console.log(adminMode);
  return (
    <article className="product-box">
      <h3 className="product-title">{product.title.slice(0, 20)}</h3>
      <img className="product-image" src={product.image} alt={product.title} />
      <span className="product-price">${product.price}</span>
      {!adminMode ? (
        <button onClick={() => addToCart(product)} className="add-to-cart-btn">
          <img src={CartIcon} alt="Cart" /> Add to Cart
        </button>
      ) : (
        <button
          onClick={() => handleRemoveProduct(product.id)}
          className="remove_product_btn"
        >
          <img src={removeIcon} alt="remove product" />
          Remove Product
        </button>
      )}

      <p className="product-description">
        {product.description.slice(0, 70)}...
      </p>

      <Link className="view-details-link" to={`/products/${product.id}`}>
        <button className="view-more-btn">View Details</button>
      </Link>
    </article>
  );
}
export default ProductItem;
