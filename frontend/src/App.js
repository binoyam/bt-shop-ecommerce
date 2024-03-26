import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Categories from "./components/Categories/Categories";
import All from "./components/Categories/All";
import Mens from "./components/Categories/Mens";
import Womens from "./components/Categories/Womens";
import Electronics from "./components/Categories/Electronics";
import Jewelery from "./components/Categories/Jewelery";
import HomePage from "./Pages/HomePage/HomePage";
import Checkout from "./Pages/CheckoutPage/Checkout";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
import ProductDescription from "./Pages/Product-DescriptionPage/ProductDescription";
import About from "./Pages/AboutPage/About";
import Contact from "./Pages/ContactPage/Contact";
import ProductList from "./components/ProductList/ProductList";
import PrivacyPolicy from "./Pages/PrivacyPolicyPage/PrivacyPolicy";

function App() {
  /* LOGGED IN STATE */
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* ALL PRODUCTS STATE */
  const [products, setProducts] = useState([]);
  /* CART ITEMS STATE */
  const [cartItems, setCartItems] = useState([]);
  /* CUSTOMER STATE */
  const [customerData, setCustomerData] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const [orderedItems, setOrderedItems] = useState([]);
  // console.log(orderedItems);
  function toggleCartDropDown() {
    setIsCartOpen(!isCartOpen);
    setIsAccountPopupOpen(false);
  }
  function toggleUserPopup() {
    setIsAccountPopupOpen(!isAccountPopupOpen);
    setIsCartOpen(false);
  }
  /* FUNCTION TO FETCH PRODUCTS */
  useEffect(() => {
    fetchProducts();
  }, []);
  const updateUserStatus = (customerData) => {
    // console.log(customerData);
    if (customerData) {
      // console.log(customerData);
      setCustomerData(customerData);
      setIsLoggedIn(true);
      localStorage.setItem("customerData", JSON.stringify(customerData));
    } else {
      setIsLoggedIn(false);
      setCustomerData(null);
      setCartItems([]);
      localStorage.setItem("customerData", "");
      localStorage.setItem("cartItems", "");
    }
  };
  const handleCustomerOrder = async () => {
    // console.log(cartItems);
    // console.log(customerData);
    const cartItemData = cartItems.map(({ id, quantity }) => ({
      productId: id,
      quantity: quantity,
    }));
    console.log(cartItemData);
    try {
      const response = await fetch("/place_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerData, cartItemData: cartItemData }),
      });
      const data = await response.json();
      console.log(data);
      if (data && data.isOrderPlaced === "true") {
        console.log("Order placed succesfully:", data);
        customerOrderPlaced(data.orderedItems);
      } else {
        console.log("Order NOT placed:", data);
      }
    } catch (error) {
      console.error("Error during order placement :", error);
    }
  };
  const customerOrderPlaced = (orderedItems) => {
    if (orderedItems) {
      setOrderedItems(orderedItems);
      console.log(orderedItems);
      setCartItems([]);
      localStorage.setItem("cartItems", "");
    }
  };
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  /* FUNCTION TO ADD ITEMS TO CART */
  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [
        ...cartItems,
        { ...product, quantity: quantity },
      ];
      setCartItems(updatedCartItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  /* FUNCTION TO REMOVE ITEMS FROM CART */
  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  /* STORE CART DATA AND CUSTOMER  DATA ON LOCAL STORAGE */
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedCustomerData = localStorage.getItem("customerData");
    if (storedCustomerData) {
      setCustomerData(JSON.parse(storedCustomerData));
      setIsLoggedIn(true);
    }
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  return (
    <div className="App">
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        toggleCartDropDown={toggleCartDropDown}
        toggleUserPopup={toggleUserPopup}
        isCartOpen={isCartOpen}
        isAccountPopupOpen={isAccountPopupOpen}
        updateUserStatus={updateUserStatus}
        customerData={customerData}
        removeFromCart={removeFromCart}
        cartItems={cartItems}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleCustomerOrder={handleCustomerOrder}
      />

      <main className="main-content">
        <Routes>
          <Route
            exact
            path="/"
            element={<HomePage products={products} addToCart={addToCart} />}
          />

          <Route
            path="/home"
            element={<HomePage products={products} addToCart={addToCart} />}
          />

          <Route
            path="/categories"
            element={<Categories addToCart={addToCart} products={products} />}
          >
            <Route
              path="all"
              element={<All addToCart={addToCart} products={products} />}
            />
            <Route
              path="mens-clothing"
              element={<Mens addToCart={addToCart} products={products} />}
            />
            <Route
              path="womens-clothing"
              element={<Womens addToCart={addToCart} products={products} />}
            />
            <Route
              path="electronics"
              element={
                <Electronics addToCart={addToCart} products={products} />
              }
            />
            <Route
              path="jewelery"
              element={<Jewelery addToCart={addToCart} products={products} />}
            />
          </Route>

          <Route
            path="/products"
            element={<ProductList products={products} addToCart={addToCart} />}
          />
          <Route
            exact
            path="/products/:id"
            element={
              <ProductDescription
                handleCustomerOrder={handleCustomerOrder}
                products={products}
                addToCart={addToCart}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                handleCustomerOrder={handleCustomerOrder}
                toggleUserPopup={toggleUserPopup}
                isLoggedIn={isLoggedIn}
                customerData={customerData}
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route
            path="/payment"
            element={
              <PaymentPage
                isLoggedIn={isLoggedIn}
                customerData={customerData}
                products={products}
                orderedItems={orderedItems}
                cartItems={cartItems}
              />
            }
          />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact customerData={customerData} />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;