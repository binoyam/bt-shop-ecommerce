function OrderItems({ orders, removeOrder }) {
 

  return (
    <ul className="orders_list">
      {orders.map((order) => (
        <li key={order.id} className="order">
          <div className="orderer">Customer: [ {order.user_name} ]</div>
          <div className="order_id">Order ID: [ {order.id} ]</div>
          <div className="order_item">
            Product Name: [ {order.product_name} ] 
          </div>
          <div className="product_id">
            Product ID: [ {order.product_id} ] 
          </div>
          <div className="order_quantity">Quantity: [{order.quantity}]</div>
          <div className="order_price">Price: [{order.price}]</div>
          <button
            className="remove_order_btn"
            onClick={() => removeOrder(order.id)}
          >
            Remove Order
          </button>
        </li>
      ))}
    </ul>
  );
}

export default OrderItems;
