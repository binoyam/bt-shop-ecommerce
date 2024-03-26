import ProductList from "../ProductList/ProductList";

function Mens({ addToCart, products }) {
  const filteredProducts = products.filter(
    (product) => product.category === "men's clothing"
  );
  return <ProductList products={filteredProducts} addToCart={addToCart} />;
}

export default Mens;
