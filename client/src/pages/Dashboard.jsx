import { useEffect, useState } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api
      .get("/auth/dashboard")
      .then((res) => setUser(res.data.user))
      .catch(() => {
        toast.error("Unauthorized. Redirecting to login...");
        setTimeout(() => (window.location.href = "/login"), 2000);
      });
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />
      {user ? (
        <div className="card shadow-lg p-4">
          <div className="d-flex align-items-center mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: "70px", height: "70px" }}
            />
            <div>
              <h3 className="mb-0">Welcome, {user.name} 👋</h3>
              <small className="text-muted">Role: {user.role}</small>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="p-3 bg-light rounded border">
                <strong>Email:</strong>
                <br />
                {user.email}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="p-3 bg-light rounded border">
                <strong>User ID:</strong>
                <br />
                {user._id}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading your dashboard...</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
