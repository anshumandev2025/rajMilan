import { baseURL } from "@/constants/urlsConstants";
import axios from "axios";

const API_BASE_URL = baseURL; // Replace with your API URL

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem("authToken"); // Get token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
