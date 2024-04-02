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
      const data = await response.json();
      if (data.productRemoved) {
        fetchProducts();
        console.log(data);
      } else {
        console.log(data);
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

  // const addProduct = async (productName) => {
  //   try {
  //     await fetch("/api/products", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ productName }),
  //     });
  //     fetchProducts();
  //   } catch (error) {
  //     console.log("Error adding product:", error);
  //   }
  // };
  return (
    <div className="admin-page">
      <h1>ADMIN PANEL</h1>
      <div className="admin_panel">
        <button
          className="customerbtn"
          onClick={() => {
            setShowCustomers(true);
            setShowOrders(false);
            setShowProducts(false);
          }}
        >
          Customers
          <span className="counter">{users.length}</span>
        </button>
        <button
          className="ordersbtn"
          onClick={() => {
            setShowCustomers(false);
            setShowOrders(true);
            setShowProducts(false);
          }}
        >
          Orders
          <span className="counter">{orders.length}</span>
        </button>
        <button
          className="productsbtn"
          onClick={() => {
            setShowCustomers(false);
            setShowOrders(false);
            setShowProducts(true);
          }}
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
        />
      )}
    </div>
  );
}

export default AdminPage;
