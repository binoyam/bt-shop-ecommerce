import { useState } from "react";
import "./OrdersList.css";

function OrdersList({ orders, onSort }) {
  console.log(orders);
  const [sortBy, setSortBy] = useState("userName");
  const [sortedOrders, setSortedOrders] = useState(orders)
  const handleSort = (option) => {
    setSortBy(option);
    const sortedOrders = [...orders].sort((a, b) => {
      if (option === "userName") {
        return a.user_name.localeCompare(b.user_name);
      } else if (option === "productName") {
        return a.product_name.localeCompare(b.product_name);
      }
    });
    setSortedOrders(sortedOrders)
  };
  return (
    <div className="orders">
      <h3>
        Orders:
        <span className="orders_counter"> [{orders.length}]</span>
      </h3>
      <div className="sort_orders_div">
        <button onClick={() => handleSort("userName")}>Sort by User</button>
        <button onClick={() => handleSort("productName")}>
          Sort by Product
        </button>
      </div>
      <ul className="orders_list">
        {sortedOrders.map((order) => (
          <li key={order.id} className="order">
            <div className="order_id">Order ID: [ {order.id} ]</div>
            <div className="orderer">Customer: [ {order.user_name} ]</div>
            <div className="order_item">
              Product Name: [ {order.product_name} ]
            </div>
            <div className="order_quantity">Quantity: [{order.quantity}]</div>
            <div className="order_price">Price: [{order.price}]</div>
            <button className="remove_order_btn">Remove Order</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
