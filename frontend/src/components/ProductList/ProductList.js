import ProductItem from "../Product-Item/ProductItem";
import "./ProductList.css";
import addIcon from "../../Assets/Images/add_icon.svg";
import { useState } from "react";
import AddProductForm from "./AddProductForm";
function ProductList({
  products,
  addToCart,
  adminMode,
  removeProduct,
  addProduct,
}) {
  const [ShowAddForm, setShowAddForm] = useState(false);
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };
  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };
  const closeForm = () => {
    setShowAddForm(false);
  };
  return (
    <div className="products-list">
      {adminMode && !ShowAddForm && (
        <article className="add_product" onClick={() => setShowAddForm(true)}>
          <h3 className="add_product_txt">Add New Product</h3>
          <img className="add_product_icon" src={addIcon} alt="add product" />
        </article>
      )}
      {ShowAddForm && (
        <AddProductForm closeForm={closeForm} addProduct={addProduct} />
      )}

      {products.reverse().map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          addToCart={handleAddToCart}
          adminMode={adminMode}
          handleRemoveProduct={handleRemoveProduct}
        />
      ))}
    </div>
  );
}

export default ProductList;
