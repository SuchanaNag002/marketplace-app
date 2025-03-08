import axios from 'axios';

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_DOMAIN}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Add an interceptor to attach the token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
