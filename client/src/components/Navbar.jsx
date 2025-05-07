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
      // Perform logout API request
      await api.post("/auth/logout", {}, { withCredentials: true });

      // Show success toast
      toast.update(toastId, {
        render: "Logged out successfully!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Clear authentication state
      setIsAuthenticated(false);
      setUserRole("");
      
      // Redirect to login page
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

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand">User Management</Link>
        <div>
          {isAuthenticated ? (
            <>
              <Link className="btn btn-link text-white" to="/dashboard">Dashboard</Link>
              {userRole === "admin" && (
                <Link className="btn btn-link text-white" to="/admin">Admin Panel</Link>
              )}
              <button className="btn btn-danger ms-2" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="btn btn-success" onClick={handleLoginRedirect}>Login</button>
          )}
        </div>
      </nav>
      <ToastContainer />
    </>
  );
}

export default Navbar;
