import axios from "axios";

const FALLBACK_API_URL = "https://notivo-7ln4.onrender.com";
const rawApiUrl = import.meta.env.VITE_API_URL || FALLBACK_API_URL;
const API_URL = rawApiUrl.includes("notivo-api.onrender.com")
  ? FALLBACK_API_URL
  : rawApiUrl;

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
