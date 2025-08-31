
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./RestaurantDashboard.css";


import { fetchCategories } from "../../store/categorySlice";
import { fetchMenuItems } from "../../store/menuSlice";
import { fetchCurrentOrders, fetchOrderHistory } from "../../store/restaurantOrderSlice";
import { fetchReviews } from "../../store/restaurantReviewsSlice";

function StatsCard({ title, value, onClick }) {
  return (
    <div className="stats-card">
      <h2>{title}</h2>
      <p>{value}</p>
      {onClick && (
        <button onClick={onClick} className="view-btn">
          View
        </button>
      )}
    </div>
  );
}

export default function RestaurantDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const categories = useSelector((state) => state.categories.list || []);
  const menuItems = useSelector((state) => state.menu.list || []);
  const currentOrders = useSelector((state) => state.restaurantOrders.currentOrders?.items || []);
  const pastOrders = useSelector((state) => state.restaurantOrders.history?.items || []);
  const reviews = useSelector((state) => state.restaurantReviews.list || []);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchMenuItems({ page: 1, size: 50 }));
    dispatch(fetchCurrentOrders());
    dispatch(fetchOrderHistory());
    dispatch(fetchReviews());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
 
      <div className="welcome-banner">
        <h1>Welcome to Restaurant Dashboard 🍴</h1>
        <p>Manage your restaurant seamlessly — track categories, menus, orders, discounts, and reviews all in one place.</p>
      </div>


      <div className="stats-grid">
        <StatsCard
          title="Total Categories"
          value={categories.length}
          onClick={() => navigate("/restaurant/categories")}
        />
        <StatsCard
          title="Total Menu Items"
          value={menuItems.length}
          onClick={() => navigate("/restaurant/menu")}
        />
        <StatsCard
          title="Current Orders"
          value={currentOrders.length}
          onClick={() => navigate("/restaurant/orders")}
        />
        <StatsCard
          title="Past Orders"
          value={pastOrders.length}
          onClick={() => navigate("/restaurant/orders")}
        />
        <StatsCard
          title="Reviews"
          value={reviews.length}
          onClick={() => navigate("/restaurant/reviews")}
        />
      </div>
    </div>
  );
}
