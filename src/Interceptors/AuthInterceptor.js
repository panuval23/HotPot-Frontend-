
import axios from "axios";
import { baseUrl } from "../environment.dev";

const api = axios.create({
  baseURL: baseUrl, 
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

