import { api } from './index';

export const signup = async (userData) => {
  const res = await api.post('/api/auth/register', userData); // <-- changed
  return res.data;
};

export const signin = async (credentials) => {
  const res = await api.post('/api/auth/login', credentials); // <-- changed
  // Store token and user info based on role
  if (res.data.token && res.data.user) {
    if (res.data.user.role === 'admin' || res.data.user.role === 'super_admin') {
      localStorage.setItem('adminToken', res.data.token);
      localStorage.setItem('adminUser', JSON.stringify(res.data.user));
    } else {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
  }
  return res.data;
};


