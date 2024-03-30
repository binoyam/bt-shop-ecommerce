import { useEffect, useState } from "react";
import "./AdminPage.css";

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
           Customer ID: [{user.id}] Name: [{user.name}], Email: [{user.email}], Gender: [{user.gender}]{" "}
          </li>
        ))}
      </ul>

      <h3>Orders:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>Order ID: [{order.id}], Product: {order.product_name}, Quantity: [{order.quantity}]</li>
        ))}
      </ul>

      <h3>Products:</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPage;
