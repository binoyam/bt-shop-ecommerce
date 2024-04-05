import { useEffect, useState } from "react";
import "./AdminPage.css";
import UsersList from "./UsersList";
import OrdersList from "./OrdersList";
import ProductList from "../../components/ProductList/ProductList";

function AdminPage({ adminMode }) {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [showCustomers, setShowCustomers] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  // console.log(users);
  // console.log(orders);
  // console.log(products);
  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);
  const handleOptionClick = (showCust, showOrd, showProd) => {
    setShowCustomers(showCust);
    setShowOrders(showOrd);
    setShowProducts(showProd);
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      // console.log(data);
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/all_products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };
  const removeOrder = async (orderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.orderRemoved) {
        fetchOrders();
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("Error removing order:", error);
    }
  };
  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`/api/remove_product/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to remove product: " + response.statusText);
      }
      const data = await response.json();
      if (data.productRemoved) {
        fetchProducts();
        console.log("Product removed successfully", data);
      } else {
        console.log("Failed to remove product:", data.error);
      }
    } catch (error) {
      console.log("Error removing product:", error);
    }
  };

  const removeUser = async (userId) => {
    try {
      const response = await fetch(`/api/remove_user/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.userRemoved) {
        fetchUsers();
        fetchOrders();
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log("Error removing user:", error);
    }
  };

  const addProduct = async (product) => {
    try {
      const response = await fetch("/api/add_product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const data = await response.json();

      if (data.productAdded) {
        console.log("Product added successfully", data);
        fetchProducts();
      } else {
        console.log("Failed to add product:", data.error);
      }
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };
  return (
    <div className="admin-page">
      <h1>ADMIN PANEL</h1>
      <div className="admin_panel">
        <button
          className={`customerbtn ${showCustomers ? "selected" : ""}`}
          onClick={() => handleOptionClick(true, false, false)}
        >
          Customers
          <span className="counter">{users.length}</span>
        </button>
        <button
          className={`ordersbtn ${showOrders ? "selected" : ""}`}
          onClick={() => handleOptionClick(false, true, false)}
        >
          Orders
          <span className="counter">{orders.length}</span>
        </button>
        <button
          className={`productsbtn ${showProducts ? "selected" : ""}`}
          onClick={() => handleOptionClick(false, false, true)}
        >
          Products
          <span className="counter">{products.length}</span>
        </button>
      </div>
      {showCustomers && <UsersList removeUser={removeUser} users={users} />}
      {showOrders && (
        <OrdersList
          removeOrder={removeOrder}
          orders={orders}
          users={users}
          products={products}
        />
      )}
      {showProducts && (
        <ProductList
          removeProduct={removeProduct}
          adminMode={adminMode}
          products={products}
          addProduct={addProduct}
        />
      )}
    </div>
  );
}

export default AdminPage;
