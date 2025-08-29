import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../store/orderSlice";

const UserOrders = () => {
  const dispatch = useDispatch();
  const { orders = [] } = useSelector((state) => state.order || {});

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h3>📦 My Orders</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div key={order.orderID} className="list-group-item">
              <h5>{order.restaurantName}</h5>
              <p>
                Ordered On: {new Date(order.createdOn).toLocaleString()} <br />
                Status: <strong>{order.status}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
