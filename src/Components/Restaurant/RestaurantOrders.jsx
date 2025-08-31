
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentOrders,
  fetchOrderHistory,
  changeOrderStatus,
} from "../../store/restaurantOrderSlice";

export default function RestaurantOrders() {
  const dispatch = useDispatch();
  const { currentOrders, history, loading, error } = useSelector(
    (s) => s.restaurantOrders
  );

  useEffect(() => {
    dispatch(fetchCurrentOrders());
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  const updateStatus = (id, status) => {
    dispatch(changeOrderStatus({ id, status }));
  };

  return (
    <div className="mt-4">
      <h3>📦 Current Orders</h3>
      {loading && <p>Loading orders...</p>}
      {error && <p className="text-danger">{error}</p>}

      {currentOrders?.items?.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.items.map((order) => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>₹{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => updateStatus(order.orderID, "Processing")}
                  >
                    Processing
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => updateStatus(order.orderID, "InProgress")}
                  >
                    In Progress
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => updateStatus(order.orderID, "Delivered")}
                  >
                    Delivered
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => updateStatus(order.orderID, "Cancelled")}
                  >
                    Cancelled
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No current orders.</p>
      )}

      <h3 className="mt-5">📜 Order History</h3>
      {history?.items?.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Status</th>
              <th>Total</th>
              <th>Placed On</th>
            </tr>
          </thead>
          <tbody>
            {history.items.map((order) => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>{order.status}</td>
                <td>₹{order.totalAmount}</td>
                <td>{new Date(order.createdOn).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No past orders.</p>
      )}
    </div>
  );
}
