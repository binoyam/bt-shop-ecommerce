import ProductList from "../ProductList/ProductList";

function All({ addToCart, products }) {
  const filteredProducts = products.filter(() => true);
  return <ProductList products={filteredProducts} addToCart={addToCart} />;
}

export default All;
