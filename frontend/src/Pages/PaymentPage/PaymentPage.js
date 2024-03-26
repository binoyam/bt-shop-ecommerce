import { useState } from "react";
import "./PaymentPage.css";
import MasterCardLogo from "../../Assets/Images/mastercard-logo.svg";
import PaypalLogo from "../../Assets/Images/paypal-logo.svg";
import BitcoinLogo from "../../Assets/Images/bitcoin-logo.svg";
import CreditCardForm from "../../components/PaymentForms/CreditCardForm";
import PayPalForm from "../../components/PaymentForms/PayPalForm";
import BitcoinForm from "../../components/PaymentForms/BitcoinForm";

function PaymentPage({
  cartItems,
  customerData,
  isLoggedIn,
  orderedItems,
  products,
}) {
  const [selectedPayMethod, setSelectedPayMethod] = useState("creditcard");
  console.log(orderedItems);
  // const TAX_RATE = 0.15;
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const handlePayMethodChange = (method) => {
    setSelectedPayMethod(method);
  };

  return (
    <div className="payment-page">
      {isLoggedIn && (
        <div className="payment_page_header">
          Dear [{customerData?.customerName}],
          <p className="pph_txt">
            Your Order has been placed successfully <br />
            Continue to payment below to finish
          </p>
        </div>
      )}
      <div className="current-total-div">
        <p className="current-total-pre">Current Total: </p>
        <span className="current-total">${calculateTotal().toFixed(2)}</span>
      </div>
      <div className="payment-methods">
        <h2 className="pay-method-title">Choose payment method</h2>
        <div className="methods">
          <button
            id="pay-method-btn"
            onClick={() => handlePayMethodChange("creditcard")}
            className={
              selectedPayMethod === "creditcard"
                ? "method-btn active"
                : "method-btn"
            }
          >
            <img className="card-img" src={MasterCardLogo} alt="mastercard" />
          </button>
          <button
            id="pay-method-btn"
            onClick={() => handlePayMethodChange("paypal")}
            className={
              selectedPayMethod === "paypal"
                ? "method-btn active"
                : "method-btn"
            }
          >
            <img className="paypal-img" src={PaypalLogo} alt="paypal" />
          </button>
          <button
            id="pay-method-btn"
            onClick={() => handlePayMethodChange("bitcoin")}
            className={
              selectedPayMethod === "bitcoin"
                ? "method-btn active"
                : "method-btn"
            }
          >
            <img className="bitcoin-img" src={BitcoinLogo} alt="bitcoin" />
          </button>
        </div>
      </div>

      <div className="payment-form-container">
        {selectedPayMethod === "creditcard" && <CreditCardForm />}
        {selectedPayMethod === "paypal" && <PayPalForm />}
        {selectedPayMethod === "bitcoin" && <BitcoinForm />}
      </div>
    </div>
  );
}

export default PaymentPage;
