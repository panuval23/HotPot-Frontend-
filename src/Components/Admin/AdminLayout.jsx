

import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import "./AdminDashboard.css";

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <AdminNavbar />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
