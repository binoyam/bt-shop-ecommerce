import ProductItem from "../Product-Item/ProductItem";
import "./ProductList.css";
import addIcon from "../../Assets/Images/add_icon.svg";
function ProductList({ products, addToCart, adminMode }) {
  const handleAddToCart = (product) => {
    addToCart(product, 1);
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
        />
      ))}
    </div>
  );
}

export default ProductList;
