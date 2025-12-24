import axios from "axios";
import { BASE_URL } from "./constants";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("authToken"); // Changed to authToken
    if (accessToken) {
      // Attach token to the Authorization header if it exists
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Any successful response can be returned directly
    return response;
  },
  (error) => {
    // Check if the error is due to unauthorized access (401)
    if (error.response && error.response.status === 401) {
      // If 401 Unauthorized, remove the token and redirect to login
      localStorage.removeItem("authToken"); // Clear the authToken if it's invalid
      window.location.href = "/login"; // Redirect to login page
    }

    // Handle 403 Forbidden
    if (error.response && error.response.status === 403) {
      alert("You do not have permission to perform this action.");
    }

    return Promise.reject(error); // Always reject the promise to handle it in the component
  }
);

export default axiosInstance;
