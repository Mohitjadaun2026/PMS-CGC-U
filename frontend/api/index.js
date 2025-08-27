import axios from 'axios';
import API_BASE_URL from '../src/config/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }
};

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // For general user
    const adminToken = localStorage.getItem('adminToken'); // For admin user

    if (adminToken) { // Prioritize admin token if available
      config.headers.Authorization = `Bearer ${adminToken}`;
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Load token from storage on init
const stored = localStorage.getItem('token');
if (stored) setAuthToken(stored);

export default function handler(req, res) {
  res.status(200).send('Welcome to PMS-CGC-U Backend API! 🚀');
  res.status(200).send('Welcome to PMS-CGC-U Backend API (Vercel serverless)! 🚀');
}
