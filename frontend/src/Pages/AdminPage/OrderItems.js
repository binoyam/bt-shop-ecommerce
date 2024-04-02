import React from "react";

function OrderItems({ orders, removeOrder }) {
  const handleRemoveOrder = (orderId) => {
    removeOrder(orderId);
  };
  return (
    <ul className="orders_list">
      {orders.map((order) => (
        <li key={order.id} className="order">
          <div className="orderer">Customer: [ {order.user_name} ]</div>
          <div className="order_id">Order ID: [ {order.id} ]</div>
          <div className="order_item">
            Product Name: [ {order.product_name} ]
          </div>
          <div className="order_quantity">Quantity: [{order.quantity}]</div>
          <div className="order_price">Price: [{order.price}]</div>
          {console.log(order.id)}
          <button
            className="remove_order_btn"
            onClick={() => handleRemoveOrder(order.id)}
          >
            Remove Order
          </button>
        </li>
      ))}
    </ul>
  );
}

export default OrderItems;
