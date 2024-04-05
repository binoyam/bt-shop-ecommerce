import ProductList from "../ProductList/ProductList";

function Mens({ addToCart, products, adminMode }) {
  const filteredProducts = products.filter(
    (product) => product.category === "men's clothing"
  );
  return <ProductList adminMode={adminMode} products={filteredProducts} addToCart={addToCart} />;
}

export default Mens;
