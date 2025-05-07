import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [skipAuthCheck, setSkipAuthCheck] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (skipAuthCheck) return;

    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setIsAuthenticated(true);
        setUserRole(res.data.user.role);
      } catch {
        setIsAuthenticated(false);
        setUserRole("");
      }
    };

    checkAuth();
  }, [location.pathname, skipAuthCheck]);

 const handleLogout = async () => {
  const toastId = toast.loading("Logging out...");

  try {
    // Send logout request to backend
    await api.post("/auth/logout", {}, { withCredentials: true });

    // Update state
    setIsAuthenticated(false);
    setUserRole("");
    setSkipAuthCheck(true);

    // Show success toast
    toast.update(toastId, {
      render: "Logged out successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });

    // Slight delay to allow toast update before navigation
    setTimeout(() => {
      navigate("/login");
    }, 100);
  } catch (err) {
    // Show error toast if logout fails
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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            User Management
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {isAuthenticated && (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}

              {isAuthenticated && userRole === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Panel
                  </Link>
                </li>
              )}

              <li className="nav-item">
                {isAuthenticated ? (
                  <button className="btn btn-danger ms-3" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link className="btn btn-success ms-3" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ToastContainer />
    </>
  );
}

export default Navbar;
