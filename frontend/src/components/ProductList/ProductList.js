import ProductItem from "../Product-Item/ProductItem";
import "./ProductList.css";
import addIcon from "../../Assets/Images/add_icon.svg";
function ProductList({ products, addToCart, adminMode, removeProduct }) {
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };
  const handleRemoveProduct = (productId) => {
    removeProduct(productId);
  };
  return (
    <div className="products-list">
      {adminMode && (
        <article className="add_product">
          <h3 className="add_product_txt">Add New Product</h3>
          <img className="add_product_icon" src={addIcon} alt="add product" />
        </article>
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
    </div>
  );
}

export default ProductList;
