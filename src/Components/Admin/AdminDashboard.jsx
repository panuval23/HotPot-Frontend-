
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants, fetchUsers } from "../../store/adminSlice";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { totalRestaurants, totalUsers, restaurants, users, pageSize } = useSelector(
    (s) => s.admin
  );

  useEffect(() => {
    
    dispatch(fetchRestaurants({ pageNumber: 1, pageSize }));
    dispatch(fetchUsers({ pageNumber: 1, pageSize }));
  }, [dispatch, pageSize]);




  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="grid-cards">
       
        <div className="card">
          <h3>Total Users</h3>
          <p className="metric">{totalUsers ?? "-"}</p>
          <button onClick={() => navigate("/admin/users/normal")}>View all users</button>
        </div>
       

        <div className="card">
          <h3>Total Restaurants</h3>
          <p className="metric">{totalRestaurants ?? "-"}</p>
          <button onClick={() => navigate("/admin/restaurants")}>
            View all restaurants
          </button>
        </div>
       
      </div>
    </div>
  );
}
