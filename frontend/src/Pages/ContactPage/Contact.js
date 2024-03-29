import { useState } from "react";
import "./Contact.css";
import UserIcon from "../../Assets/Images/user-name-icon.svg";
import EmailIcon from "../../Assets/Images/email-icon.svg";
import MsgIcon from "../../Assets/Images/message-icon.svg";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  /* MAKE SUBMIT MESSAGE DISAPPEAR AFTER 7 SECONDS */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.feedbackSubmitted === "true") {
          console.log("Feedback succesfully submitted");
          setIsSubmitted(true);
        } else {
          console.log("Feedback NOT submitted");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-page-header-text">Contact Us</h1>
      {isSubmitted ? (
        <div className="submit-message-container">
          <p className="submit-message">
            Dear {name},<br /> Thank you for contacting us!
            <br />{" "}
            <span>
              We will get back to you soon <br /> [{email}].
            </span>
          </p>
        </div>
      ) : (
        <div className="form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact_form_group">
              <label htmlFor="name">Name</label>
              <img src={UserIcon} alt="name" />
              <input
                className="name"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="contact_form_group">
              <label htmlFor="email">Email</label>
              <img src={EmailIcon} alt="email" />
              <input
                className="email"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="contact_form_group">
              <label htmlFor="message">Message</label>
              <img src={MsgIcon} alt="message" />

              <textarea
                id="message"
                className="message"
                placeholder="Write your thoughts..."
                value={message}
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button className="submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contact;
