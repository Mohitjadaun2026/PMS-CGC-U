// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://pms-cgc-u.onrender.com/';

export const API_ENDPOINTS = {
  JOBS: `${API_BASE_URL}/api/jobs`,
  UPLOADS: `${API_BASE_URL}`,
};

export default API_BASE_URL;
