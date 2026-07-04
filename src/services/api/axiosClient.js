import axios from 'axios';

/**
 * Preconfigured Axios instance.
 * Point VITE_API_BASE_URL at your real backend / form endpoint (e.g. Formspree, a serverless function).
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error logging hook — wire up to a monitoring service if needed.
    console.error('[API Error]', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
