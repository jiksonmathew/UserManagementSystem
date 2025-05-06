import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Registering...");

    try {
      await api.post("/auth/register", form);
      toast.update(toastId, {
        render: "Registered successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 3000); // give time for toast to show
    } catch (err) {
      toast.update(toastId, {
        render: err.response?.data?.message || "Registration failed.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control my-2"
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <button className="btn btn-primary">Register</button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Register;
