import ProductList from "../ProductList/ProductList";

function Womens({ addToCart, products, adminMode }) {
  const filteredProducts = products.filter(
    (product) => product.category === "women's clothing"
  );
  return <ProductList adminMode={adminMode} products={filteredProducts} addToCart={addToCart} />;
}

export default Womens;
