import "./Header.css";
import CartIcon from "../../Assets/icon-cart.svg";
import Nav from "../Header-Nav/Nav";
import Cart from "../Header-Cart/Cart";
import UserIcon from "../../Assets/avatar.svg";
import adminIcon from "../../Assets/adminIcon.svg";
import UserAccountPopup from "../UserAccount/UserAccountPopup";
import { Link } from "react-router-dom";

function Header({
  cartItems,
  removeFromCart,
  updateUserStatus,
  customerData,
  isLoggedIn,
  setIsLoggedIn,
  isMenuOpen,
  setIsMenuOpen,
  toggleCartDropDown,
  toggleUserPopup,
  isAccountPopupOpen,
  isCartOpen,
  setAdminMode,
  adminMode,
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
        {!adminMode && (
          <div onClick={toggleCartDropDown} className="cart-nav">
            <img src={CartIcon} alt="Cart-icon" className="cart-icon" />
            {cartItems?.length > 0 ? (
              <span className="cart-counter">{cartItems.length}</span>
            ) : null}
          </div>
        )}

        {adminMode && (
          <Link to="/admin" className="admin-profile-pic">
            <img src={adminIcon} alt="avatar" />
          </Link>
        )}

        <div
          onClick={toggleUserPopup}
          className={`user-profile-pic ${isLoggedIn ? "logged_in" : ""}`}
        >
          <img src={UserIcon} alt="avatar" />
        </div>

        {isAccountPopupOpen && (
          <UserAccountPopup
            isLoggedIn={isLoggedIn}
            updateUserStatus={updateUserStatus}
            customerData={customerData}
            toggleUserPopup={toggleUserPopup}
            setIsLoggedIn={setIsLoggedIn}
            setAdminMode={setAdminMode}
          />
        )}
      </div>
      {isCartOpen && (
        <Cart
          removeFromCart={removeFromCart}
          cartItems={cartItems}
          closeCart={toggleCartDropDown}
        />
      )}
    </header>
  );
}

export default Header;
