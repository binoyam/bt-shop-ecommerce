import React from "react";

function OrdersList({ orders }) {
  return (
    <div className="orders_list">
      <h3>Orders:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Customer: {order.user_name} Order ID: [{order.id}], Product:{" "}
            {order.product_name}, Quantity: [{order.quantity}]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
