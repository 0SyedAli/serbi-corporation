// lib/api.js (Global Fix using Interceptor)
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// --- Existing Request Interceptor (for adding tokens) ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // ✅ Automatically handle multipart requests
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- CRITICAL GLOBAL FIX: Response Interceptor ---
api.interceptors.response.use(
  (response) => {
    // 1. Check for custom API success flag if status code is generally good (e.g., 200)
    // If the API sends status:200 but body: {success: false, message: "Error"}
    if (response.data && response.data.hasOwnProperty('success') && response.data.success === false) {
      // Create a custom error object that mimics a rejected promise 
      // This will be caught by the second argument of the .use() function, 
      // or by the catch block in your Redux thunks.
      const error = new Error(response.data.message || 'API request failed');
      error.response = response; // Attach the full response for context
      return Promise.reject(error);
    }

    // If success is true or the success field is not present, proceed normally
    return response;
  },
  (error) => {
    // 2. Handle standard HTTP errors (4xx, 5xx)
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Redirecting to login...');
      // Optionally trigger global logout/redirect here
    }
    return Promise.reject(error); // Reject the promise for network/HTTP errors
  }
);

export default api;