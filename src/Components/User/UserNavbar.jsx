import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserNavbar.css";
export default function UserNavbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/collection/${search}`); 
    }
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter(value);
    if (value) {
      navigate(`/collection/${value}`);
    }
  };

  return (
    <nav className="user-nav">
      <div className="brand">HotPot</div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search dishes or restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Filter */}
      <select className="filter-dropdown" value={filter} onChange={handleFilter}>
        <option value="">Filter by</option>
        <option value="biryani">Biryani</option>
        <option value="pizza">Pizza</option>
        <option value="momos">Momos</option>
        <option value="veg">Veg</option>
        <option value="nonveg">Non-Veg</option>
      </select>

      {/* Links */}
      <div className="links">
        <NavLink to="/user/orders">Orders</NavLink>
        <NavLink to="/user/profile">Profile</NavLink>
      </div>

      {/* Logout */}
      <button className="btn-ghost" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}
