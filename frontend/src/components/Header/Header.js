import "./Header.css";
import CartIcon from "../../Assets/Images/icon-cart.svg";
import Nav from "../Header-Nav/Nav";
import Cart from "../Header-Cart/Cart";
import UserIcon from "../../Assets/Images/avatar.svg";
import UserAccountPopup from "../UserAccount/UserAccountPopup";

function Header({
  cartItems,
  removeFromCart,
  updateUserStatus,
  customerData,
  isLoggedIn,
  setIsLoggedIn,
  handleCustomerOrder,
  isMenuOpen,
  setIsMenuOpen,
  toggleCartDropDown,
  toggleUserPopup,
  isAccountPopupOpen,
  isCartOpen,
}) {
  return (
    <header className="header">
      <a href="/home" className="logo-link">
        <span className="logo-text">bt-shop</span>
        {customerData !== null && (
            <span className="username"> [ {customerData?.customerName} ]</span>
          )}
      </a>

      <Nav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="nav-right">
        <div onClick={toggleCartDropDown} className="cart-nav">
          <img src={CartIcon} alt="Cart-icon" className="cart-icon" />
          {cartItems?.length > 0 ? (
            <span className="cart-counter">{cartItems.length}</span>
          ) : null}
        </div>

        <div onClick={toggleUserPopup} className="user-profile-pic">
          <img src={UserIcon} alt="avatar" />
        </div>
        {isAccountPopupOpen && (
          <UserAccountPopup
            isLoggedIn={isLoggedIn}
            updateUserStatus={updateUserStatus}
            customerData={customerData}
            toggleUserPopup={toggleUserPopup}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </div>
      {isCartOpen && (
        <Cart
          removeFromCart={removeFromCart}
          cartItems={cartItems}
          closeCart={toggleCartDropDown}
          handleCustomerOrder={handleCustomerOrder}
        />
      )}
    </header>
  );
}

export default Header;
