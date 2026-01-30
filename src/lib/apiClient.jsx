import axios from "axios";

export const apiClient = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, ""),
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getApiErrorMessage = (err) => {
  return (
    err?.response?.data?.message ||
    err?.response?.data?.error ||
    err?.message ||
    "Something went wrong"
  );
};
