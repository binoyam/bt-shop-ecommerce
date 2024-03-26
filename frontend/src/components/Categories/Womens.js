import ProductList from "../ProductList/ProductList";

function Womens({ addToCart, products }) {
  const filteredProducts = products.filter(
    (product) => product.category === "women's clothing"
  );
  return <ProductList products={filteredProducts} addToCart={addToCart} />;
}

export default Womens;
