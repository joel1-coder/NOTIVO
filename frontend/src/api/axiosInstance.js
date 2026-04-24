import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://notivo-7ln4.onrender.com";

const axiosInstance = axios.create({
  // Ensure we always have the /api suffix
  baseURL: API_URL.endsWith("/api") ? API_URL : `${API_URL.replace(/\/$/, "")}/api`,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
