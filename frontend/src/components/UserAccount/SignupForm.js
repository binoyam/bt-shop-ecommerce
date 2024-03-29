import React, { useState } from "react";
import "./SignupForm.css";
import closeIcon from "../../Assets/Images/close_btn.svg";
function SignupForm({ updateUserStatus, setIsLoggedIn, toggleUserPopup }) {
  const [errorMessage, setErrorMessage] = useState(false);
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    phoneNumber: "",
  });
  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form fields
    if (
      signupData.username.trim() === "" ||
      signupData.email.trim() === "" ||
      signupData.password.trim() === "" ||
      signupData.gender.trim() === "" ||
      signupData.phoneNumber.trim() === ""
    ) {
      // Display an error message or perform any desired action
      console.log("Please fill in all fields");
      return;
    }
    // Send the form data to the backend API
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.signupSuccess === "true") {
          console.log(data);
          const customerData = {
            customerId: data.customerId,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
          };
          updateUserStatus(customerData);
          setErrorMessage(false);
          setIsLoggedIn(true);
          setSignupData({
            username: "",
            email: "",
            password: "",
            gender: "",
            phoneNumber: "",
          });
        } else if (data && data.signupSuccess === "false1") {
          setErrorMessage(true);
        } else {
          console.log("Signup unsuccessful:", data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="signup_form">
      {errorMessage && (
        <div className="error_message">Email already registered</div>
      )}
      <div onClick={toggleUserPopup} className="close_popup_icon">
        <img src={closeIcon} alt="close popup" />
      </div>
      <h2>Sign up</h2>

      <div className="signup_form_group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="username"
          placeholder="Enter your name"
          value={signupData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup_form_group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email account"
          value={signupData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup_form_group">
        <label htmlFor="password">Create password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Create password"
          value={signupData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="signup_form_group">
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={signupData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div className="signup_form_group">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone number"
          value={signupData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="signup_form_btn">
        Sign up
      </button>
    </form>
  );
}

export default SignupForm;
