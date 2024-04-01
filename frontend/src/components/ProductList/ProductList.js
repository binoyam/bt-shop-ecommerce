import ProductItem from '../Product-Item/ProductItem';
import './ProductList.css';

function ProductList({ products, addToCart, adminMode }) {
  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };
  return (
    <div className="products-list">
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
