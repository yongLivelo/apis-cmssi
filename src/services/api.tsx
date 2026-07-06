import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  auth: { username: "admin", password: "admin" },
});

export default api;
