import ProductItem from "../Product-Item/ProductItem";
import "./ProductList.css";
import addIcon from "../../Assets/add_icon.svg";
import { useEffect, useState } from "react";
import AddProductForm from "./AddProductForm";
import AddToCartPopup from "../AddToCartPopup/AddToCartPopup";
function ProductList({
  products,
  addToCart,
  adminMode,
  removeProduct,
  addProduct,
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [addedPrd, setAddedPrd] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setShowPopup(true);
    setAddedPrd(product);
  };
  /* SHOW ADDED-PRODUCT AS POPUP */
  useEffect(() => {
    if (addedPrd) {
      const timeout = setTimeout(() => {
        setShowPopup(false)
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [addedPrd]);
  /* FUNCTIONS FOR ADMIN TO REMOVE PRODUCT & CLOSE ADD PRODUCT FORM */
  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };
  const closeForm = () => {
    setShowAddForm(false);
  };
  return (
    <div className="products-list">
      {adminMode && !showAddForm && (
        <article className="add_product" onClick={() => setShowAddForm(true)}>
          <h3 className="add_product_txt">Add New Product</h3>
          <img className="add_product_icon" src={addIcon} alt="add product" />
        </article>
      )}
      {showAddForm && (
        <AddProductForm closeForm={closeForm} addProduct={addProduct} />
      )}

      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          addToCart={handleAddToCart}
          adminMode={adminMode}
          handleRemoveProduct={handleRemoveProduct}
        />
      ))}
      {showPopup && addedPrd && <AddToCartPopup product={addedPrd} />}
    </div>
  );
}

export default ProductList;
