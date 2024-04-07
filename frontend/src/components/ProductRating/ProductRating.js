import { useState } from "react";
import "./ProductRating.css";
import ThumbsDownIcon from "../../Assets/Images/thumbs_down.svg";
import ThumbsUpIcon from "../../Assets/Images/thumbs_up.svg";

function ProductRating({ productId, setShowRatingForm }) {
  const [rating, setRating] = useState(null);
  const submitRating = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/rate_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: parseInt(productId), rating }),
      });
      const data = await response.json();

      if (data.rateSubmited) {
        console.log("Rating inserted successfully!", data);
        setShowRatingForm(false);
        alert("Thank you, your rating is submitted.");
      } else {
        throw new Error("Rating insertion failed.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  return (
    <form onSubmit={submitRating} className="product_rating_form">
      <label htmlFor="prd_rating">Rating: {rating || "2.5"} / 5</label>
      <div className="rating_input">
        <img className="thumbs_down" src={ThumbsDownIcon} alt="thumbs down" />
        <input
          id="prd_rating"
          className="rating_range"
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={rating || "2.5"}
          onChange={handleRatingChange}
        />
        <img className="thumbs_up" src={ThumbsUpIcon} alt="thumbs up" />
      </div>
      <button className="submit_rate_btn" type="submit">
        Submit
      </button>
    </form>
  );
}

export default ProductRating;
