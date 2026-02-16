import { api } from './index';

export const signup = async (userData) => {
  const res = await api.post('/api/auth/register', userData); // <-- changed
  return res.data;
};

export const signin = async (credentials) => {
  try {
    const res = await api.post('/api/auth/login', credentials);
    console.log("Raw signin response:", res.data);
    
    // Store token and user info based on role
    if (res.data.token && res.data.user) {
      console.log("Storing auth data for user:", res.data.user.email);
      if (res.data.user.role === 'admin' || res.data.user.role === 'super_admin') {
        localStorage.setItem('adminToken', res.data.token);
        localStorage.setItem('adminUser', JSON.stringify(res.data.user));
        console.log("Stored as admin user");
      } else {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        console.log("Stored as regular user");
      }
    }
    return res.data;
  } catch (error) {
    console.error("Signin API error:", error);
    throw error;
  }
};


