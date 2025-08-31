
import api from "../Interceptors/AuthInterceptor";

export const getCurrentOrders = async () => {
  const res = await api.get("Restaurant/orders/current");
  return res.data;
};

export const getOrderHistory = async () => {
  const res = await api.get("Restaurant/orders/history");
  return res.data;
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const res = await api.put(`Restaurant/orders/${orderId}/status`, { newStatus });
  return res.data;
};

