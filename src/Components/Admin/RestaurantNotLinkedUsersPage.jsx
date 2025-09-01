import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../store/adminSlice";
import UserTable from "./UserTable";
import Pagination from "../Common/Pagination";  
import "./AdminTables.css"; 

export default function RestaurantNotLinkedUsersPage() {
  const dispatch = useDispatch();
  const { users, pageSize, loading, error } = useSelector((s) => s.admin);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch]);

  const notLinkedUsers =
    users?.filter((u) => u.role === "Restaurant" && !u.restaurant?.restaurantID) || [];

  const current = notLinkedUsers.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = (id) => {
    if (window.confirm("Delete user?")) dispatch(deleteUser(id));
  };

  return (
    <section className="admin-section">
      <h2>Restaurant Users – Not Linked</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

      <UserTable
        rows={current}
        columns={["ID", "Username", "Contact", "Status", "Actions"]}
        renderRow={(u) => (
          <>
            <td data-label="ID">{u.userID}</td>
            <td data-label="Username">{u.username}</td>
            <td data-label="Contact">{u.contactNumber}</td>
            <td data-label="Status">{u.isActive ? "Active" : "Inactive"}</td>
            <td data-label="Actions">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(u.userID)}
              >
                Delete
              </button>
            </td>
          </>
        )}
        noDataMsg="No unlinked restaurant users"
      />

     
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        total={notLinkedUsers.length}
        onPageChange={setPage}
      />
    </section>
  );
}
