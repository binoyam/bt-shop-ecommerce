import { useState } from "react";
import "./OrdersList.css";
import OrderItems from "./OrderItems";

function OrdersList({ orders, removeOrder }) {
  const [sortBy, setSortBy] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  /* FUNCTION TO REMOVE ORDER FROM ORDERS ARRAY */
  const handleRemoveOrder = (orderId) => {
    removeOrder(orderId);
    setFilteredOrders(filteredOrders.filter((order) => order.id !== orderId));
  };
  /* SORT ORDERS BY USERNAME OR PRODUCT NAME */
  const handleSort = (option) => {
    setSortBy(option);
    if (option === "userName") {
      setShowUsers(true);
      setShowProducts(false);
    } else if (option === "productName") {
      setShowUsers(false);
      setShowProducts(true);
    } else {
      setShowUsers(false);
      setShowProducts(false);
    }
  };
  /* FILTER ALL ORDRES BY USERNAME  */
  const orderOwners = orders.filter(
    (order, index, self) =>
      self.findIndex((o) => o.user_name === order.user_name) === index
  );
  /* FILTER ALL ORDRES BY PRODUCT  */
  const orderedProducts = orders.filter(
    (order, index, self) =>
      self.findIndex((o) => o.product_name === order.product_name) === index
  );
  /* FUNCTION TO FILTER ORDERS BY PRODUCT NAME */
  const handleProductClick = (productName) => {
    const users = orders.filter((order) => order.product_name === productName);
    setFilteredOrders(users);
    // console.log(users);
  };
  /* FUNCTION TO FILTER ORDERS BY USER NAME */
  const handleUserClick = (userName) => {
    const products = orders.filter((order) => order.user_name === userName);
    setFilteredOrders(products);

    // console.log(products);
  };
  // console.log(orderOwners);
  // console.log(orderedProducts);
  return (
    <div className="orders">
      <div className="sort_orders_div">
        <button
          className={`sort_by_product_btn ${
            sortBy === "all" ? "selected_sort" : ""
          }`}
          onClick={() => handleSort("all")}
        >
          All Orders
        </button>
        <button
          className={`sort_by_name_btn ${
            sortBy === "userName" ? "selected_sort" : ""
          }`}
          onClick={() => handleSort("userName")}
        >
          Sort by User
        </button>
        <button
          className={`sort_by_product_btn ${
            sortBy === "productName" ? "selected_sort" : ""
          }`}
          onClick={() => handleSort("productName")}
        >
          Sort by Product
        </button>
      </div>
      {showUsers && sortBy === "userName" && (
        <div className="orders_by_user">
          {orders.length !== 0 ? (
            <h4>Users who placed orders</h4>
          ) : (
            <h4>No users have ordered</h4>
          )}
          <div className="order_makers">
            {orderOwners.map((order) => (
              <button
                className="order_maker"
                key={order.id}
                onClick={() => handleUserClick(order.user_name)}
              >
                {order.user_name}
              </button>
            ))}
          </div>
        </div>
      )}
      {showProducts && sortBy === "productName" && (
        <ul className="orders_by_product">
          {orders.length !== 0 ? (
            <h4>Ordered Products</h4>
          ) : (
            <h4>No Product ordered</h4>
          )}
          <div className="ordered_products">
            {orderedProducts.map((order) => (
              <button
                className="order_product"
                key={order.id}
                onClick={() => handleProductClick(order.product_name)}
              >
                {order.product_name}
              </button>
            ))}
          </div>
        </ul>
      )}
      <OrderItems removeOrder={handleRemoveOrder} orders={filteredOrders} />
    </div>
  );
}

export default OrdersList;
