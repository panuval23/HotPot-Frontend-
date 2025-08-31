// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchRestaurants,
//   fetchUsers,
//   addRestaurant,
//   updateRestaurant,
//   deleteRestaurant,
// } from "../../store/adminSlice"; 

// import AddRestaurantForm from "./AddRestaurantForm";
// import "./AdminDashboard.css";
// const AdminDashboard = () => {
//   const dispatch = useDispatch();
//   const {
//     restaurants,
//     users,
//     loading,
//     error,
//     totalRestaurants,   
//     totalUsers,         
//     pageNumber,
//   } = useSelector((state) => state.admin);

//   const [showForm, setShowForm] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [pageSize] = useState(10);
//   useEffect(() => {
//     dispatch(fetchRestaurants({ pageNumber: 1, pageSize }));
//     dispatch(fetchUsers());
//   }, [dispatch, pageSize]);

//   const handleAdd = (data) => {
//     dispatch(addRestaurant(data)).then(() => {
//       setShowForm(false);
//       dispatch(fetchRestaurants({ pageNumber, pageSize }));
//     });
//   };

//   const handleUpdate = (id, data) => {
//     dispatch(updateRestaurant({ id, data })).then(() => {
//       setEditData(null);
//       dispatch(fetchRestaurants({ pageNumber, pageSize }));
//     });
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this restaurant?")) {
//       dispatch(deleteRestaurant(id)).then(() => {
//         dispatch(fetchRestaurants({ pageNumber, pageSize }));
//       });
//     }
//   };

//   const handlePageChange = (newPage) => {
//     dispatch(fetchRestaurants({ pageNumber: newPage, pageSize }));
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {loading && <p>Loading...</p>}
//       <div className="dashboard-summary">
//         <div className="summary-card">
//           <h3>Total Restaurants</h3>
//           <p>{totalRestaurants}</p>
//         </div>
//         <div className="summary-card">
//           <h3>Total Users</h3>
//           <p>{totalUsers}</p>
//         </div>
//       </div>
//       <section className="restaurants-section">
//         <h2>Restaurants</h2>
//         <button className="add-btn" onClick={() => setShowForm(true)}>
//           + Add Restaurant
//         </button>

//         {showForm && (
//           <AddRestaurantForm
//             onSubmit={handleAdd}
//             onCancel={() => setShowForm(false)}
//           />
//         )}

//         {editData && (
//           <AddRestaurantForm
//             initialData={editData}
//             onSubmit={(data) => handleUpdate(editData.restaurantID, data)}
//             onCancel={() => setEditData(null)}
//           />
//         )}

//         <table className="restaurants-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Restaurant Name</th>
//               <th>Message</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {restaurants?.map((res) => (
//               <tr key={res.restaurantID}>
//                 <td>{res.restaurantID}</td>
//                 <td>{res.restaurantName}</td>
//                 <td>{res.message}</td>
//                 <td>
//                   <button
//                     className="edit-btn"
//                     onClick={() => setEditData(res)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => handleDelete(res.restaurantID)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         {/* <div className="pagination">
//           {Array.from(
//             { length: Math.ceil(totalRestaurants / pageSize) },
//             (_, i) => (
//               <button
//                 key={i + 1}
//                 className={`page-btn ${pageNumber === i + 1 ? "active" : ""}`}
//                 disabled={pageNumber === i + 1}
//                 onClick={() => handlePageChange(i + 1)}
//               >
//                 {i + 1}
//               </button>
//             )
//           )}
//         </div> */}
//       </section>
//       <section className="users-section">
//         <h2>Users</h2>
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Username</th>
//               <th>Contact Number</th>
//               <th>Addresses</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.map((user) => (
//               <tr key={user.userID}>
//                 <td>{user.userID}</td>
//                 <td>{user.username}</td>
//                 <td>{user.contactNumber}</td>
//                 <td>
//                   {user.addresses.map((addr, idx) => (
//                     <div key={idx} className="user-address">
//                       <strong>{addr.addressType}:</strong> {addr.addressLine},{" "}
//                       {addr.city}, {addr.state} - {addr.pincode}
//                       {addr.landmark && (
//                         <span className="landmark">
//                           {" "}
//                           (Landmark: {addr.landmark})
//                         </span>
//                       )}
//                     </div>
//                   ))}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       <div className="grid-cards">
//         <div className="card">
//           <h3>Total Users</h3>
//           <p className="metric">—</p>
//           <button onClick={() => navigate("/admin/users")}>View all users</button>
//         </div>
//         <div className="card">
//           <h3>Active Users</h3>
//           <p className="metric">—</p>
//         </div>
//         <div className="card">
//           <h3>Inactive Users</h3>
//           <p className="metric">—</p>
//         </div>

//         <div className="card">
//           <h3>Total Restaurants</h3>
//           <p className="metric">—</p>
//           <button onClick={() => navigate("/admin/restaurants")}>View all restaurants</button>
//         </div>
//         <div className="card">
//           <h3>Active Restaurants</h3>
//           <p className="metric">—</p>
//         </div>
//         <div className="card">
//           <h3>Inactive Restaurants</h3>
//           <p className="metric">—</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/Components/Admin/AdminDashboard.jsx
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRestaurants, fetchUsers } from "../../store/adminSlice";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { totalRestaurants, totalUsers, restaurants, users, pageSize } = useSelector(s => s.admin);

//   useEffect(() => {
//     dispatch(fetchRestaurants({ pageNumber: 1, pageSize }));
//     dispatch(fetchUsers({ pageNumber: 1, pageSize }));
//   }, [dispatch, pageSize]);

//   // derive active/inactive counts from loaded data (quick estimate)
//   const activeRestaurants = restaurants?.filter(r => r.isActive).length ?? 0;
//   const inactiveRestaurants = (restaurants?.length ?? 0) - activeRestaurants;
//   const activeUsers = users?.filter(u => u.isActive).length ?? 0;
//   const inactiveUsers = (users?.length ?? 0) - activeUsers;

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       <div className="grid-cards">
//         <div className="card">
//           <h3>Total Users</h3>
//           <p className="metric">{totalUsers ?? "-"}</p>
//           <button onClick={() => navigate("/admin/users")}>View all users</button>
//         </div>

//         <div className="card">
//           <h3>Active Users (sample)</h3>
//           <p className="metric">{activeUsers}</p>
//           <small>Shown from current page</small>
//         </div>

//         <div className="card">
//           <h3>Inactive Users (sample)</h3>
//           <p className="metric">{inactiveUsers}</p>
//           <small>Shown from current page</small>
//         </div>

//         <div className="card">
//           <h3>Total Restaurants</h3>
//           <p className="metric">{totalRestaurants ?? "-"}</p>
//           <button onClick={() => navigate("/admin/restaurants")}>View all restaurants</button>
//         </div>

//         <div className="card">
//           <h3>Active Restaurants (sample)</h3>
//           <p className="metric">{activeRestaurants}</p>
//           <small>Shown from current page</small>
//         </div>

//         <div className="card">
//           <h3>Inactive Restaurants (sample)</h3>
//           <p className="metric">{inactiveRestaurants}</p>
//           <small>Shown from current page</small>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRestaurants, fetchUsers } from "../../store/adminSlice";
// import { useNavigate } from "react-router-dom";

// export default function AdminDashboard() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { totalRestaurants, totalUsers, restaurants, users, pageSize } = useSelector(s => s.admin);

//   useEffect(() => {
//     dispatch(fetchRestaurants({ pageNumber: 1, pageSize }));
//     dispatch(fetchUsers({ pageNumber: 1, pageSize }));
//   }, [dispatch, pageSize]);

//   const activeRestaurants = restaurants?.filter(r => r.isActive).length ?? 0;
//   const inactiveRestaurants = (restaurants?.length ?? 0) - activeRestaurants;

//   const activeUsers = users?.filter(u => u.isActive).length ?? 0;
//   const inactiveUsers = (users?.length ?? 0) - activeUsers;

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

//       <div className="grid-cards">
//         <div className="card">
//           <h3>Total Users</h3>
//           <p className="metric">{totalUsers ?? "-"}</p>
//           <button onClick={() => navigate("/admin/users")}>View all users</button>
//         </div>
//         <div className="card">
//           <h3>Active Users</h3>
//           <p className="metric">{activeUsers}</p>
//         </div>
//         <div className="card">
//           <h3>Inactive Users</h3>
//           <p className="metric">{inactiveUsers}</p>
//         </div>

//         <div className="card">
//           <h3>Total Restaurants</h3>
//           <p className="metric">{totalRestaurants ?? "-"}</p>
//           <button onClick={() => navigate("/admin/restaurants")}>View all restaurants</button>
//         </div>
//         <div className="card">
//           <h3>Active Restaurants</h3>
//           <p className="metric">{activeRestaurants}</p>
//         </div>
//         <div className="card">
//           <h3>Inactive Restaurants</h3>
//           <p className="metric">{inactiveRestaurants}</p>
//         </div>
//       </div>
//     </div>
//   );
// }
// src/Components/Admin/AdminDashboard.jsx
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
    // fetch only first page, because we just want totals + some sample data
    dispatch(fetchRestaurants({ pageNumber: 1, pageSize }));
    dispatch(fetchUsers({ pageNumber: 1, pageSize }));
  }, [dispatch, pageSize]);




  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="grid-cards">
        {/* USERS */}
        <div className="card">
          <h3>Total Users</h3>
          <p className="metric">{totalUsers ?? "-"}</p>
          <button onClick={() => navigate("/admin/users/normal")}>View all users</button>
        </div>
       

        {/* RESTAURANTS */}
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
