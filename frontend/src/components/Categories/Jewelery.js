import ProductList from "../ProductList/ProductList";

function Jewelery({ addToCart, products, adminMode }) {
  const filteredProducts = products.filter(
    (product) => product.category === "jewelery"
  );
  return <ProductList  adminMode={adminMode} products={filteredProducts} addToCart={addToCart} />;
}

export default Jewelery;
