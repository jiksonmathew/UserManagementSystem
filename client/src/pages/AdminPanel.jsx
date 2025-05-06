import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdate = async (userId) => {
    const toastId = toast.loading("Updating user...");
    try {
      await api.put(`/admin/users/${userId}`, formData);
      setEditingUserId(null);
      await fetchUsers();
      toast.update(toastId, {
        render: "User updated successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch {
      toast.update(toastId, {
        render: "Update failed.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async (userId) => {
    const toastId = toast.loading("Deleting user...");
    try {
      await api.delete(`/admin/users/${userId}`);
      await fetchUsers();
      toast.update(toastId, {
        render: "User deleted.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch {
      toast.update(toastId, {
        render: "Delete failed.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Admin Panel - Manage Users</h2>

      {users.map((user) => (
        <div className="card mb-3 p-3" key={user._id}>
          {editingUserId === user._id ? (
            <>
              <input
                className="form-control mb-2"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                className="form-control mb-2"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
              />
              <select
                className="form-control mb-2"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                className="btn btn-primary me-2"
                onClick={() => handleUpdate(user._id)}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditingUserId(null)}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <h5>
                {user.name} ({user.role})
              </h5>
              <p>{user.email}</p>
              <button
                className="btn btn-warning me-2"
                onClick={() => handleEditClick(user)}>
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(user._id)}>
                Delete
              </button>
            </>
          )}
        </div>
      ))}

      <ToastContainer />
    </div>
  );
}

export default AdminPanel;
