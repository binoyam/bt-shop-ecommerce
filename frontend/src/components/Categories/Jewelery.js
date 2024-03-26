import ProductList from "../ProductList/ProductList";

function Jewelery({ addToCart, products }) {
  const filteredProducts = products.filter(
    (product) => product.category === "jewelery"
  );
  return <ProductList products={filteredProducts} addToCart={addToCart} />;
}

export default Jewelery;
