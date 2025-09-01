
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRestaurants,
  deleteRestaurant,
  updateRestaurant,
  addRestaurant,
} from "../../store/adminSlice";
import AddRestaurantForm from "./AddRestaurantForm";
import { useNavigate } from "react-router-dom";
import "./AdminTables.css"; 
export default function RestaurantsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants, loading, error, totalRestaurants, restaurantsPage, pageSize } = useSelector(s => s.admin);

  const [editing, setEditing] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    dispatch(fetchRestaurants({ pageNumber: restaurantsPage || 1, pageSize }));
  }, [dispatch, restaurantsPage, pageSize]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete restaurant? (Will be soft-deleted)")) return;
    dispatch(deleteRestaurant(id)).then(() => {
      dispatch(fetchRestaurants({ pageNumber: restaurantsPage, pageSize }));
    });
  };

  const handleEdit = (restaurant) => {
    setEditing(restaurant);
  };

  const handleUpdate = (data) => {
    const id = editing.restaurantID;
    dispatch(updateRestaurant({ id, data })).then(() => {
      setEditing(null);
      dispatch(fetchRestaurants({ pageNumber: restaurantsPage, pageSize }));
    });
  };

  const handleAdd = (data) => {
    dispatch(addRestaurant(data)).then(() => {
      setShowAddForm(false);
      dispatch(fetchRestaurants({ pageNumber: 1, pageSize }));
    });
  };

  const pagesCount = Math.max(1, Math.ceil((totalRestaurants || 0) / pageSize));

  return (
    <section className="admin-section">
      <div className="section-head">
        <h2>Restaurants</h2>
        <div>
          <button className="btn-primary" onClick={() => navigate("/admin/restaurants/add")}>+ Add Restaurant</button>
          <button className="btn-ghost" style={{ marginLeft: 8 }} onClick={() => { setShowAddForm(s => !s); setEditing(null); }}>
            {showAddForm ? "Hide Add Form" : "Quick Add"}
          </button>
        </div>
      </div>

      {showAddForm && <AddRestaurantForm onSubmit={handleAdd} onCancel={() => setShowAddForm(false)} />}

      {editing && (
        <div style={{ marginTop: 12 }}>
          <h4>Edit</h4>
          <AddRestaurantForm initialData={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        </div>
      )}

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

      <table className="table table-striped" style={{ marginTop: 12 }}>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.length === 0 && (
            <tr><td colSpan={6}>No restaurants found</td></tr>
          )}
          {restaurants?.map(r => (
            <tr key={r.restaurantID}>
              <td data-label="ID">{r.restaurantID}</td>
              <td data-label="Name">{r.restaurantName}</td>
            
              <td data-label="Status">{r.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button className="btn btn-success btn-sm" onClick={() => handleEdit(r)}>Edit</button>{" "}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.restaurantID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <div>Page: </div>
        {Array.from({ length: pagesCount }, (_, i) => (
          <button
            key={i}
            className={`page-btn ${restaurantsPage === i + 1 ? "active" : ""}`}
            onClick={() => dispatch(fetchRestaurants({ pageNumber: i + 1, pageSize }))}
            disabled={restaurantsPage === i + 1}
          >
            {i + 1}
          </button>
        ))}
        <div style={{ marginLeft: "auto" }}>{totalRestaurants} restaurants</div>
      </div>
    </section>
  );
}
