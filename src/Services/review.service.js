
import api from "../Interceptors/AuthInterceptor";

// Service for restaurant reviews
export const getRestaurantReviews = async () => {
  const res = await api.get("Restaurant/reviews");
  return res.data;
};
