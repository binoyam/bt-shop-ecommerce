import ProductList from "../ProductList/ProductList";

function Electronics({ addToCart, products, adminMode }) {
  const filteredProducts = products.filter(
    (product) => product.category === "electronics"
  );
  return <ProductList adminMode={adminMode} products={filteredProducts} addToCart={addToCart} />;
}

export default Electronics;
