// import { NavLink, useNavigate } from "react-router-dom";
// import "./AdminNavbar.css";


// export default function AdminNavbar() {
//   const navigate = useNavigate();
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <nav className="admin-nav">
//       <div className="brand">Admin</div>
//       <div className="links">
//         <NavLink end to="/admin">Dashboard</NavLink>
       
//         <NavLink to="/admin/users/normal">Normal Users</NavLink>
// <NavLink to="/admin/users/linked">Restaurant Users - Linked</NavLink>
// <NavLink to="/admin/users/unlinked">Restaurant Users - Not Linked</NavLink>
// <NavLink to="/admin/users/admins">Admin Users</NavLink>


//         <NavLink to="/admin/restaurants">Restaurants</NavLink>
//         <NavLink to="/admin/restaurants/add" className="btn-primary">
//           + Add Restaurant
//         </NavLink>
//       </div>
//       <button className="btn" onClick={logout}>Logout</button>
//     </nav>
//   );
// }

// import { NavLink, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./AdminNavbar.css";

// export default function AdminNavbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/login");
//   };

//   return (
//     <nav className="admin-nav">
//        <div className="brand">
//         <img src="/images/hotpot.png" alt="HotPot Logo" className="brand-logo" />
//         <span>HotPot</span>
//       </div>

//       {/* Hamburger Button */}
//       <button
//         className="hamburger"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         ☰
//       </button>

//       {/* Links */}
//       <div className={`links ${isOpen ? "open" : ""}`}>
//         <NavLink end to="/admin" onClick={() => setIsOpen(false)}>
//           Dashboard
//         </NavLink>
//         <NavLink to="/admin/users/normal" onClick={() => setIsOpen(false)}>
//           Normal Users
//         </NavLink>
//         <NavLink to="/admin/users/linked" onClick={() => setIsOpen(false)}>
//           Restaurant Users - Linked
//         </NavLink>
//         <NavLink to="/admin/users/unlinked" onClick={() => setIsOpen(false)}>
//           Restaurant Users - Not Linked
//         </NavLink>
//         <NavLink to="/admin/users/admins" onClick={() => setIsOpen(false)}>
//           Admin Users
//         </NavLink>
//         <NavLink to="/admin/restaurants" onClick={() => setIsOpen(false)}>
//           Restaurants
//         </NavLink>
//         <NavLink
//           to="/admin/restaurants/add"
//           className="btn-primary"
//           onClick={() => setIsOpen(false)}
//         >
//           + Add Restaurant
//         </NavLink>
//         <button className="btn logout" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }


import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="admin-nav">
      {/* Logo / Brand */}
      <div className="brand">
        <img src="/images/hotpot.png" alt="HotPot Logo" className="brand-logo" />
        <span>HotPot</span>
      </div>

      {/* Hamburger Button */}
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Links */}
      <div className={`links ${isOpen ? "open" : ""}`}>
        <NavLink end to="/admin" onClick={() => setIsOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users/normal" onClick={() => setIsOpen(false)}>
          Normal Users
        </NavLink>
        <NavLink to="/admin/users/linked" onClick={() => setIsOpen(false)}>
          Restaurant Users - Linked
        </NavLink>
        <NavLink to="/admin/users/unlinked" onClick={() => setIsOpen(false)}>
          Restaurant Users - Not Linked
        </NavLink>
        <NavLink to="/admin/users/admins" onClick={() => setIsOpen(false)}>
          Admin Users
        </NavLink>
        <NavLink to="/admin/restaurants" onClick={() => setIsOpen(false)}>
          Restaurants
        </NavLink>
        <NavLink
          to="/admin/restaurants/add"
          className="btn-primary"
          onClick={() => setIsOpen(false)}
        >
          + Add Restaurant
        </NavLink>
        <button className="btn logout" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
