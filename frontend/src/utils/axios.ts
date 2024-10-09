import axios from "axios";
import Cookies from "js-cookie";

// Create an instance of Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000", // Mengambil baseURL dari variabel lingkungan
});

// Add a request interceptor to include the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Ambil token dari Cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally (such as expired tokens)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token is invalid or expired, logout user
      Cookies.remove("token"); // Remove token from Cookies
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error); // Propagate the error
  }
);

export default api;
