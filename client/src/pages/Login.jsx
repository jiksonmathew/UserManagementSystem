import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");

    try {
      await api.post("/auth/login", form);
      toast.update(toastId, {
        render: "Logged in successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000); // delay for toast display
    } catch (err) {
      toast.update(toastId, {
        render: err.response?.data?.message || "Login failed.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control my-2"
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="btn btn-success">Login</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Login;
