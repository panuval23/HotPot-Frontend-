import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";

const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, status, error } = useSelector((state) => state.order);

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const calculateFinalAmount = (order) => {
    const deliveryFee = 25; 
    const gst = order.totalAmount * 0.05; 
    return {
      itemTotal: order.totalAmount,
      deliveryFee,
      gst,
      toPay: order.totalAmount + deliveryFee + gst,
    };
  };

  if (status === "loading") {
    return <div className="container mt-5 text-center">Loading your orders...</div>;
  }

  if (status === "failed") {
    return (
      <div className="container mt-5 text-center text-danger">
        ⚠️ Failed to load orders: {error}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h4>No orders found</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      <div className="row">
    
        <div className="col-md-5">
          <ul className="list-group">
            {orders.map((order) => (
              <li
                key={order.orderID}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedOrder?.orderID === order.orderID ? "active text-white" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedOrder(order)}
              >
                <div>
                  <strong>#{order.orderID}</strong> - {order.restaurantName}
                  <br />
                  <small className="text-muted">
                    {new Date(order.createdOn).toLocaleString()}
                  </small>
                </div>
                <span
                  className={`badge ${
                    order.status === "Delivered"
                      ? "bg-success"
                      : order.status === "Pending"
                      ? "bg-warning text-dark"
                      : "bg-secondary"
                  }`}
                >
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-7">
          {selectedOrder ? (
            <div className="card p-3">
              <h4>Order #{selectedOrder.orderID}</h4>
              <p>
                <strong>Restaurant:</strong> {selectedOrder.restaurantName}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Ordered On:</strong>{" "}
                {new Date(selectedOrder.createdOn).toLocaleString()}
              </p>

              <h5>Items:</h5>
              <ul className="list-group">
                {selectedOrder.items?.map((item) => (
                  <li
                    key={item.menuItemID}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {item.menuItemName} × {item.quantity}
                    </span>
                    <span>₹{item.subtotal}</span>

                    {selectedOrder.status === "Delivered" && (
                    <button
                    className="btn btn-sm btn-outline-primary ms-3"
                    onClick={() =>
                      navigate(`/reviews/add/${item.menuItemID}`, {
                        state: { menuItemName: item.menuItemName }
                      })
                    }
                  >
                    ➕ Add Review
                  </button>
                  
                    )}
                  </li>
                ))}
              </ul>


              <div className="mt-3">
                <h6>Bill Details</h6>
                {(() => {
                  const { itemTotal, deliveryFee, gst, toPay } =
                    calculateFinalAmount(selectedOrder);
                  return (
                    <>
                      <div className="d-flex justify-content-between">
                        <span>Item Total</span>
                        <span>₹{itemTotal}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Delivery Fee</span>
                        <span>₹{deliveryFee}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>GST & Other Charges</span>
                        <span>₹{gst.toFixed(2)}</span>
                      </div>
                      <div className="d-flex justify-content-between fw-bold">
                        <span>To Pay</span>
                        <span>₹{toPay.toFixed(2)}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

 
              {selectedOrder.deliveryStatuses?.length > 0 && (
                <div className="mt-3">
                  <h6>Delivery Updates:</h6>
                  <ul className="list-group">
                    {selectedOrder.deliveryStatuses.map((ds, idx) => (
                      <li key={idx} className="list-group-item">
                        <strong>{ds.status}</strong> at{" "}
                        {new Date(ds.updatedAt).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted mt-5 text-center">
              Select an order to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
