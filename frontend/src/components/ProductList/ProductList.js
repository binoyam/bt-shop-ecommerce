import ProductItem from "../Product-Item/ProductItem";
import "./ProductList.css";
import addIcon from "../../Assets/Images/add_icon.svg";
import { useState } from "react";
import AddProductForm from "./AddProductForm";
function ProductList({ products, addToCart, adminMode, removeProduct }) {
  const [ShowAddProductForm, setShowAddProductForm] = useState(false)
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };
  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };
  const handleProductAdd = ()=>{
    setShowAddProductForm(true)
  }
  return (
    <div className="products-list">
      {/* <div className="filter_screen"></div> */}
      {adminMode && (
        <article className="add_product" onClick={handleProductAdd}>
          <h3 className="add_product_txt">Add New Product</h3>
          <img className="add_product_icon" src={addIcon} alt="add product" />
        </article>
      )}
      {ShowAddProductForm && <AddProductForm />}
      {products.map((product) => (
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
