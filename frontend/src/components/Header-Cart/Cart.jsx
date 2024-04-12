import "./Cart.css";
import RemoveIcon from "../../Assets/Images/icon-remove.svg";
import { Link } from "react-router-dom";
import closeIcon from "../../Assets/Images/close_btn.svg";
function Cart({ cartItems, removeFromCart, closeCart }) {
  // console.log(cartItems);
  const handleCheckout = () => {
    closeCart();
  };
  return (
    <div className="cart-drop-down">
      <p className="cart-header">Cart</p>
      <div onClick={closeCart} className="close_cart">
        <img src={closeIcon} alt="close cart" />
      </div>
      <div className="cart-content">
        {cartItems?.length > 0 ? (
          <ul className="cart-items-list">
            {cartItems?.map(({ id, image, title, price, quantity }) => (
              <li className="cart-item" key={id}>
                <div className="cart-item-image">
                  <img src={image} alt="product" />
                </div>
                <div className="cart-item-details">
                  <span className="item-name">{title.slice(0, 60)}</span>
                  <div className="item-pricing-detail">
                    <span className="item-price">${price}</span>
                    <span className="multiply-sign">&times;</span>
                    <span className="item-amount">{quantity}</span>
                    <span className="item-price-total">
                      ${(quantity * price).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(id)}
                  className="item-remove-btn"
                >
                  <img src={RemoveIcon} alt="remove" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <span className="empty-cart">Your cart is empty</span>
        )}
      </div>
      {cartItems?.length > 0 && (
        <Link to="/checkout">
          <button className="checkout-btn" onClick={handleCheckout}>
            CHECKOUT
          </button>
        </Link>
      )}
    </div>
  );
}

export default Cart;
