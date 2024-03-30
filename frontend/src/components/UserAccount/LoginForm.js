import React, { useState } from "react";
import "./LoginForm.css";
import closeIcon from "../../Assets/Images/close_btn.svg";

function LoginForm({
  updateUserStatus,
  setIsLoggedIn,
  toggleUserPopup,
  setAdminMode,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      console.log("Please fill in all fields");
      return;
    }
    // Make API call to the Flask backend
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.loginSuccess === "true") {
          const { customerId, customerName, customerEmail, isAdmin } = data;
          const customerData = {
            customerId,
            customerName,
            customerEmail,
            isAdmin,
          };
          updateUserStatus(customerData);
          setIsLoggedIn(true);
          setErrorMessage(false);
          setAdminMode(data.isAdmin === true);
        } else {
          console.log("Login unsuccessful:", data);
          setErrorMessage(true);
          // alert("Login attempt failed: Incorrect Username or Password. Please try again.")
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login_form">
      {errorMessage && (
        <div className="error_message">Incorrect User name or Password</div>
      )}
      <div onClick={toggleUserPopup} className="close_popup_icon">
        <img src={closeIcon} alt="close popup" />
      </div>
      <h2 className="login_txt">Login in to your account</h2>
      <div className="login_form_group">
        <label htmlFor="username">User name</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          style={errorMessage ? { border: "1px solid red" } : null}
          required
        />
      </div>
      <div className="login_form_group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          style={errorMessage ? { border: "1px solid red" } : null}
          required
        />
      </div>
      <button type="submit" className="login_form_btn">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
