import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../store/adminSlice";
import UserTable from "./UserTable";
import Pagination from "../Common/Pagination";

export default function AdminUsersPage() {
  const dispatch = useDispatch();
  const { users, pageSize, loading, error } = useSelector((s) => s.admin);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers({ pageNumber: 1, pageSize: 100 }));
  }, [dispatch]);

  // ✅ filter only admins
  const adminUsers = users?.filter((u) => u.role === "Admin") || [];
  const current = adminUsers.slice((page - 1) * pageSize, page * pageSize);

  const handleDelete = (id) => {
    if (window.confirm("Delete user?")) dispatch(deleteUser(id));
  };

  return (
    <section className="admin-section">
      <h2>Admin Users</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}

      <UserTable
        rows={current}
        columns={["ID", "Username", "Contact", "Status", "Actions"]}
        renderRow={(u) => (
          <>
            <td>{u.userID}</td>
            <td>{u.username}</td>
            <td>{u.contactNumber}</td>
            <td>{u.isActive ? "Active" : "Inactive"}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(u.userID)}
              >
                Delete
              </button>
            </td>
          </>
        )}
        noDataMsg="No admin users"
      />

      <Pagination
        currentPage={page}
        pageSize={pageSize}
        total={adminUsers.length}
        onPageChange={setPage}
      />
    </section>
  );
}
