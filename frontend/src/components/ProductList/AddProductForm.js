import { useState } from "react";
import "./AddProductForm.css";

function AddProductForm({ addProduct }) {
  const [product, setProduct] = useState({
    category: "",
    description: "",
    image: "",
    price: "",
    title: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the addProduct function and pass the product object
    // addProduct(product);

    console.log(product);
    // Reset the form
    setProduct({
      category: "",
      description: "",
      image: "",
      price: "",
      title: "",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="add_product_form">
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
        />
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Image Link:
        <input
          type="text"
          name="image"
          value={product.image}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductForm;
