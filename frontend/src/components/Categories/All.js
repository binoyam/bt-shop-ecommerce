import ProductList from "../ProductList/ProductList";

function All({ addToCart, products, adminMode }) {
  const filteredProducts = products.filter(() => true);
  return <ProductList adminMode={adminMode} products={filteredProducts} addToCart={addToCart} />;
}

export default All;
