import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

function Navbar({ isAuthenticated, setIsAuthenticated, setUserRole, userRole }) {
  const navigate = useNavigate();

  console.log("Navbar props:", { isAuthenticated, userRole });

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });

      toast.update(toastId, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      setIsAuthenticated(false);
      setUserRole("");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.update(toastId, {
        render: "Logout failed!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand">User Management</Link>
        <div>
          {isAuthenticated && (
            <>
              <Link className="btn btn-link text-white" to="/dashboard">Dashboard</Link>
              {userRole === "admin" && (
                <Link className="btn btn-link text-white" to="/admin">Admin Panel</Link>
              )}
              <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
            </>
