import ProductList from "../ProductList/ProductList";

function Electronics({ addToCart, products }) {
  const filteredProducts = products.filter(
    (product) => product.category === "electronics"
  );
  return <ProductList products={filteredProducts} addToCart={addToCart} />;
}

export default Electronics;
