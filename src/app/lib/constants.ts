import axios, { InternalAxiosRequestConfig } from "axios";
import useAuthStore from "../store/authStores";
import { error } from "console";

const { token } = useAuthStore.getState();
console.log(token);
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
