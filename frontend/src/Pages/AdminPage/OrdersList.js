import { useState } from "react";
import "./OrdersList.css";
import OrderItems from "./OrderItems";

function OrdersList({ orders, removeOrder }) {
  // console.log(orders);
  const [sortBy, setSortBy] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [showUsers, setShowUsers] = useState(false);
  const [showProducts, setShowProducts] = useState(false);

  const handleRemoveOrder = (orderId) => {
    removeOrder(orderId);
    setFilteredOrders(orders);
  };

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
      setFilteredOrders(orders);
    }
  };

  const orderOwners = orders.filter(
    (order, index, self) =>
      self.findIndex((o) => o.user_name === order.user_name) === index
  );
  const orderedProducts = orders.filter(
    (order, index, self) =>
      self.findIndex((o) => o.product_name === order.product_name) === index
  );
  const handleProductClick = (productName) => {
    const users = orders.filter((order) => order.product_name === productName);
    setFilteredOrders(users);
    console.log(users); // You can replace this with your rendering logic
  };
  const handleUserClick = (userName) => {
    const products = orders.filter((order) => order.user_name === userName);
    setFilteredOrders(products);

    console.log(products); // You can replace this with your rendering logic
  };
  // console.log(orderOwners);
  // console.log(orderedProducts);
  return (
    <div className="orders">
      <h3>
        Orders:
        <span className="orders_counter"> [{orders.length}]</span>
      </h3>
      <div className="sort_orders_div">
        <button
          className="sort_by_product_btn"
          onClick={() => handleSort("all")}
        >
          {sortBy} Orders
        </button>
        <button
          className="sort_by_name_btn"
          onClick={() => handleSort("userName")}
        >
          Sort by User
        </button>
        <button
          className="sort_by_product_btn"
          onClick={() => handleSort("productName")}
        >
          Sort by Product
        </button>
      </div>
      {showUsers && (
        <div className="orders_by_user">
          <h4>Users who placed orders</h4>
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
      {showProducts && (
        <ul className="orders_by_product">
          <h4>Ordered Products</h4>
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
      <OrderItems
        removeOrder={() => handleRemoveOrder()}
        filteredOrders={filteredOrders}
      />
    </div>
  );
}

export default OrdersList;
