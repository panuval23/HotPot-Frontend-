import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../store/adminSlice";
import UserTable from "./UserTable";
import Pagination from "../Common/Pagination";   
import "./AdminTables.css";

export default function NormalUsersPage() {
  const dispatch = useDispatch();
  const { users, pageSize, loading, error } = useSelector((s) => s.admin);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch]);

  const normalUsers = users?.filter((u) => u.role === "User") || [];
  const current = normalUsers.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = (id) => {
    if (window.confirm("Delete user?")) dispatch(deleteUser(id));
  };

  return (
    <section className="admin-section">
      <h2>Normal Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

      <UserTable
        rows={current}
        columns={["ID", "Username", "Contact", "Addresses", "Status", "Actions"]}
        renderRow={(u) => (
          <>
            <td  data-label="ID">{u.userID}</td>
            <td data-label="Username">{u.username}</td>
            <td data-label="Contact">{u.contactNumber}</td>
            <td data-label="Address">
              {u.addresses?.map((a, i) => (
                <div key={i}>
                  <strong>{a.addressType}</strong>: {a.addressLine}, {a.city} {a.pincode}
                </div>
              ))}
            </td>
            <td data-label="Status">{u.isActive ? "Active" : "Inactive"}</td>
            <td>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(u.userID)}>
                Delete
              </button>
            </td>
          </>
        )}
        noDataMsg="No normal users"
      />

    
      <Pagination
        currentPage={page}
        pageSize={pageSize}
        total={normalUsers.length}
        onPageChange={setPage}
      />
    </section>
  );
}
