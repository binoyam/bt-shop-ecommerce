import { useEffect, useState } from "react";
import "./AdminPage.css";
import ProductList from "../../components/ProductList/ProductList";
import ProductItem from "../../components/Product-Item/ProductItem";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  console.log(users);
  console.log(orders);
  console.log(products);
  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const data = await response.json();
      console.log(data);
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
      await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
      fetchOrders();
    } catch (error) {
      console.log("Error removing order:", error);
    }
  };

  const removeUser = async (userId) => {
    try {
      await fetch(`/api/users/${userId}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.log("Error removing user:", error);
    }
  };

  const addProduct = async (productName) => {
    try {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productName }),
      });
      fetchProducts();
    } catch (error) {
      console.log("Error adding product:", error);
    }
  };
  return (
    <div className="admin-page">
      <h2>Hey boss! What would you like to do today?</h2>
      <button>Customers</button>
      <button>Orders</button>
      <button>Products</button>
      <h3>Users:[{users.length}]</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            Customer ID: [{user.id}] Name: [{user.name}], Email: [{user.email}],
            Gender: [{user.gender}]{" "}
          </li>
        ))}
      </ul>

      <h3>Orders:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: [{order.id}], Product: {order.product_name}, Quantity: [
            {order.quantity}]
          </li>
        ))}
      </ul>

      <h3>Products:</h3>
      <ul>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
