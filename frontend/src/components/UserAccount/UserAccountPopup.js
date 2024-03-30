import "./UserAccountPopup.css";
import { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";
import closeIcon from "../../Assets/Images/close_btn.svg";
function UserAccountPopup({
  toggleUserPopup,
  updateUserStatus,
  customerData,
  isLoggedIn,
  setIsLoggedIn,
  setAdminMode,
}) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleLoginClick = () => {
    setShowSignupForm(false);
    setShowLoginForm(true);
  };
  const handleSignupClick = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };
  return (
    <>
      <div className="user-account-popup show">
        {!showLoginForm && !showSignupForm && !isLoggedIn && (
          <div className="login_signup_div">
            <button onClick={toggleUserPopup} className="stay_out_btn">
              Stay signed out
            </button>
            <div className="login_signup_header">
              <p className="signup_txt">You are NOT signed in</p>
            </div>
            <div className="login_signup_btns">
              <button onClick={handleLoginClick} className="login_btn">
                Log In
              </button>
              <button onClick={handleSignupClick} className="signup_btn">
                Sign Up
              </button>
            </div>
          </div>
        )}
        {showLoginForm && !isLoggedIn && (
          <LoginForm
            isLoggedIn={isLoggedIn}
            customerData={customerData}
            updateUserStatus={updateUserStatus}
            setIsLoggedIn={setIsLoggedIn}
            toggleUserPopup={toggleUserPopup}
            setAdminMode={setAdminMode}
          />
        )}
        {showSignupForm && !isLoggedIn && (
          <SignupForm
            isLoggedIn={isLoggedIn}
            customerData={customerData}
            updateUserStatus={updateUserStatus}
            setIsLoggedIn={setIsLoggedIn}
            toggleUserPopup={toggleUserPopup}
          />
        )}

        {isLoggedIn && customerData && (
          <div className="login_success">
            <div onClick={toggleUserPopup} className="close_popup_icon">
              <img src={closeIcon} alt="close popup" />
            </div>
            <p className="logged_user">
              You are logged in as [
              <span className="customer_username">
                {" "}
                {customerData.customerName}{" "}
              </span>
              ]
            </p>
            <Link
              to="/home"
              onClick={() => updateUserStatus(null)}
              className="logout_btn"
            >
              Sign out?
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default UserAccountPopup;
