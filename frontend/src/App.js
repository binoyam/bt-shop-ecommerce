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
import AdminPage from "./Pages/AdminPage/AdminPage";

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
  const [adminMode, setAdminMode] = useState(false);
  // console.log(cartItems);
  /*  FETCH PRODUCTS AND GET  CART DATA AND CUSTOMER DATA FROM LOCAL STORAGE */
  useEffect(() => {
    fetchProducts();
    const storedCart = localStorage.getItem("cartItems");
    const storedOrders = localStorage.getItem("orderedItems");
    const storedCustomerData = localStorage.getItem("customerData");
    if (storedCustomerData) {
      const customerData = JSON.parse(storedCustomerData);
      setCustomerData(customerData);
      setIsLoggedIn(true);
      setAdminMode(customerData.isAdmin === true);
    }
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    if (storedOrders) {
      setOrderedItems(JSON.parse(storedOrders));
    }
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  /* FUNCTION TO TOGGLE CART POPUP */
  function toggleCartDropDown() {
    setIsCartOpen(!isCartOpen);
    setIsAccountPopupOpen(false);
  }
  /* FUNCTION TO TOGGLE USER POPUP */
  function toggleUserPopup() {
    setIsAccountPopupOpen(!isAccountPopupOpen);
    setIsCartOpen(false);
  }
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
      setAdminMode(false);
      localStorage.setItem("customerData", "");
      localStorage.setItem("orderedItems", "");
      localStorage.setItem("cartItems", "");
    }
  };
  /* FUNCTION: PLACE ORDER */
  const handleCustomerOrder = async () => {
    // console.log(cartItems);
    // console.log(customerData);
    const cartItemData = cartItems.map(({ id, quantity, price, title }) => ({
      productId: id,
      quantity: quantity,
      price: price,
      title: title,
    }));
    // console.log(cartItemData);
    try {
      const response = await fetch("/api/place_order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerData, cartItemData: cartItemData }),
      });
      const data = await response.json();
      // console.log(data);
      if (data && data.isOrderPlaced === "true") {
        console.log("Order placed succesfully:", data);
        const orderedItems = data.orderedItems;
        setOrderedItems(orderedItems);
        setCartItems([]);
        console.log(orderedItems);
        localStorage.setItem("orderedItems", JSON.stringify(orderedItems));
        localStorage.setItem("cartItems", "");
      } else {
        console.log("Order NOT placed:", data);
      }
    } catch (error) {
      console.error("Error during order placement :", error);
    }
  };


  /* FUNCTION TO ADD ITEMS TO CART */
  const addToCart = (product, quantity) => {
    setIsCartOpen(true);
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
        setAdminMode={setAdminMode}
        adminMode={adminMode}
      />

      <main className="main-content">
        <Routes>
          <Route path="/admin" element={<AdminPage adminMode={adminMode} />} />

          <Route
            exact
            path="/"
            element={<HomePage addToCart={addToCart} products={products} />}
          />

          <Route
            path="/home"
            element={<HomePage addToCart={addToCart} products={products} />}
          />

          <Route
            path="/categories"
            element={
              <Categories
                adminMode={adminMode}
                addToCart={addToCart}
                products={products}
              />
            }
          >
            <Route
              path="all"
              element={
                <All
                  adminMode={adminMode}
                  addToCart={addToCart}
                  products={products}
                />
              }
            />
            <Route
              path="mens-clothing"
              element={
                <Mens
                  adminMode={adminMode}
                  addToCart={addToCart}
                  products={products}
                />
              }
            />
            <Route
              path="womens-clothing"
              element={
                <Womens
                  adminMode={adminMode}
                  addToCart={addToCart}
                  products={products}
                />
              }
            />
            <Route
              path="electronics"
              element={
                <Electronics
                  adminMode={adminMode}
                  addToCart={addToCart}
                  products={products}
                />
              }
            />
            <Route
              path="jewelery"
              element={
                <Jewelery
                  adminMode={adminMode}
                  addToCart={addToCart}
                  products={products}
                />
              }
            />
          </Route>

          <Route
            path="/products"
            element={
              <ProductList
                adminMode={adminMode}
                addToCart={addToCart}
                products={products}
              />
            }
          />
          <Route
            exact
            path="/products/:id"
            element={
              <ProductDescription
                addToCart={addToCart}
                products={products}
                adminMode={adminMode}
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
                orderedItems={orderedItems}
              />
            }
          />

          <Route path="/about" element={<About />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
