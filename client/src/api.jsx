import axios from "axios";

const api = axios.create({
  baseURL: "https://usermanagementsystem-server-v2y3.onrender.com/api",
  withCredentials: true,
});
export default api;
