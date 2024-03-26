import "./Checkout.css";
import DeleteIcon from "../../Assets/Images/remove-item-icon.svg";
import OrderSummary from "../../components/Checkout-OrderSummary/OrderSummary";

function Checkout({
  cartItems,
  removeFromCart,
  customerData,
  isLoggedIn,
  toggleUserPopup,
  handleCustomerOrder,
}) {
  // console.log(customerData);
  const TAX_RATE = 0.15;
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        {isLoggedIn && (
          <div className="customer_info_order">
            <p className="checkout-header-text">Order Info.</p>
            <p>
              Customer Name: <span>{customerData?.customerName}</span>
            </p>
            <p>
              Customer Id: <span>{customerData?.customerId}</span>
            </p>
          </div>
        )}
        <div className="current-total-div">
          <p className="current-total-pre">Total (before tax): </p>
          <span className="current-total">${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
      <p className="chk-out-list-header">
        Cart
        <span className="checkout-amount">
          [{cartItems.length} {cartItems.length > 1 ? "Items" : "Item"}]
        </span>
      </p>
      <ul className="chk-out cart-items-list">
        {cartItems.map(({ id, image, title, price, quantity }) => (
          <li className="chk-out cart-item" key={id}>
            <div className="chk-out cart-item-image">
              <img src={image} alt="product" />
            </div>
            <div className="chk-out cart-item-details">
              <span className="chk-out item-name">{title}</span>
              <div className="chk-out item-pricing-detail">
                <span className="chk-out item-price unit">
                  Unit Price: ${price}
                </span>
                <span className="chk-out item-amount">
                  Quantity: {quantity}
                </span>
                <div className="chk-out item-price-total">
                  Item Total:
                  <span className="chk-out item-price"> ${price}</span>
                  <span className="chk-out multiply-sign">&times;</span>
                  <span className="chk-out item-amount">{quantity}</span>
                  <span className="equal-sign">=</span>$
                  {(quantity * price).toFixed(2)}
                </div>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(id)}
              className="chk-out item-remove-btn"
            >
              <img src={DeleteIcon} alt="remove" />
            </button>
          </li>
        ))}
      </ul>
      <OrderSummary
        cartItems={cartItems}
        calculateTotal={calculateTotal}
        taxRate={TAX_RATE}
        isLoggedIn={isLoggedIn}
        toggleUserPopup={toggleUserPopup}
        handleCustomerOrder={handleCustomerOrder}
      />
    </div>
  );
}

export default Checkout;
