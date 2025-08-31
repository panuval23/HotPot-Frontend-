
import { NavLink, useNavigate } from "react-router-dom";
import "./RestaurantNavbar.css";

export default function RestaurantNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="restaurant-nav">
  
      <div className="brand" onClick={() => navigate("/restaurant/dashboard")}>
        <img src="/images/hotpot.png" alt="HotPot Logo" className="brand-logo" />
        <span className="brand-text">HotPot</span>
      </div>


      <div className="links">
        <NavLink to="/restaurant/dashboard">Dashboard</NavLink>
        <NavLink to="/restaurant/categories">Categories</NavLink>
        <NavLink to="/restaurant/menu">Menu</NavLink>
        <NavLink to="/restaurant/discounts">Discounts</NavLink>
        <NavLink to="/restaurant/reviews">Reviews</NavLink>
        <NavLink to="/restaurant/orders">Orders</NavLink>
      </div>

    
      <button className="btn-logout" onClick={logout}>Logout</button>
    </nav>
  );
}

