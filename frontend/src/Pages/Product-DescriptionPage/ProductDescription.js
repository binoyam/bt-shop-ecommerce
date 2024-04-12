import "./ProductDescription.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CartIcon from "../../Assets/Images/icon-cart-btn.svg";
import PlusIcon from "../../Assets/Images/icon-plus.svg";
import MinusIcon from "../../Assets/Images/icon-minus.svg";
import Arrow from "../../Assets/Images/arrow-left.svg";
import StarIcon from "../../Assets/Images/star_icon.svg";
import ProductRating from "../../components/ProductRating/ProductRating";

function ProductDescription({ products, addToCart, adminMode }) {
  // /* SELECTED PRODUCT STATE */
  /* SELECTED QUANTITY STATE */
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showRatingForm, setShowRatingForm] = useState(false);

  const productId = parseInt(id);
  const foundProduct = products.find((product) => product.id === productId);
  useEffect(() => {
    if (foundProduct) {
      setSelectedProduct(foundProduct);
    }
  }, [id, selectedProduct, foundProduct]);

  /* helper Function to set quantity back to 1 and add to cart */
  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setQuantity(1);
  };
  /* FUNCTION FOR PLUS BUTTON / increase quantity*/
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  /* FUNCTION FOR MINUS BUTTON / decrease quantity*/
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const { image, title, price, description } = selectedProduct;
  // console.log(selectedProduct);
  return (
    <div className="product-description-page">
      <Link to={!adminMode ? "/categories/all" : "/admin"} className="back-btn">
        <img src={Arrow} alt="arrow-left" />
        Back
      </Link>

      <div className="product-info">
        <div className="product-image-div">
          <img src={image} alt="product" />
        </div>

        <div className="product-details">
          <h1 className="prd-name">{title}</h1>
          <p className="prd-price">${price}</p>
          <p className="prd-description">{description}</p>
          {!adminMode && (
            <div className="product-amount-cart">
              <div className="quantity-selector">
                <button className="minus-btn" onClick={decreaseQuantity}>
                  <img src={MinusIcon} alt="minus" />
                </button>
                <span className="quantity">{quantity}</span>
                <button className="plus-btn" onClick={increaseQuantity}>
                  <img src={PlusIcon} alt="Plus" />
                </button>
              </div>
              <button onClick={handleAddToCart} className="prd-add-to-cart">
                Add to Cart
                <img src={CartIcon} alt="Cart" />
              </button>
              <Link to="/checkout" className="prd-desc-checkout-btn">
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
      {!adminMode && (
        <button
          onClick={() => setShowRatingForm(!showRatingForm)}
          className="rate_prd_btn"
        >
          <img src={StarIcon} alt="star" />
          Rate Product
        </button>
      )}
      {showRatingForm && (
        <ProductRating
          productId={productId}
          setShowRatingForm={setShowRatingForm}
        />
      )}
    </div>
  );
}
export default ProductDescription;
