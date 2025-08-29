import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();


  const lastOrder = useSelector((state) => state.order.lastOrder);

  if (!lastOrder) {
    return (
      <div className="container mt-5 text-center">
        <h3>No recent order found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/user/orders")}>
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">🎉 Order Placed Successfully!</h2>
      <p>Your order has been placed and will be processed shortly.</p>

      <div className="card p-3 mt-4">
        <h4>Order ID: #{lastOrder.orderID}</h4>
        <p>Status: <strong>{lastOrder.status}</strong></p>
        <p>
          Restaurant: <strong>{lastOrder.restaurantName}</strong>
        </p>


        <h5 className="mt-3">Items:</h5>
        <ul className="list-group">
          {lastOrder.items?.map((item) => (
            <li
              key={item.menuItemID}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                {item.menuItemName} × {item.quantity}
              </span>
              <span>₹{item.subtotal}</span>
            </li>
          ))}
        </ul>


        <div className="d-flex justify-content-between mt-3 fw-bold">
          <span>Total Amount</span>
          <span>₹{lastOrder.totalAmount}</span>
        </div>
      </div>

      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={() => navigate("/user/orders")}>
          View My Orders
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
