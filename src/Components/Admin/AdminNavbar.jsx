import { NavLink, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";


export default function AdminNavbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="admin-nav">
      <div className="brand">Admin</div>
      <div className="links">
        <NavLink end to="/admin">Dashboard</NavLink>
        {/* <NavLink to="/admin/users">Users</NavLink> */}
        <NavLink to="/admin/users/normal">Normal Users</NavLink>
<NavLink to="/admin/users/linked">Restaurant Users - Linked</NavLink>
<NavLink to="/admin/users/unlinked">Restaurant Users - Not Linked</NavLink>

        <NavLink to="/admin/restaurants">Restaurants</NavLink>
        <NavLink to="/admin/restaurants/add" className="btn-primary">
          + Add Restaurant
        </NavLink>
      </div>
      <button className="btn" onClick={logout}>Logout</button>
    </nav>
  );
}
