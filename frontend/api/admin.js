import { api } from './index';
import { API_ENDPOINTS } from '../src/config/api';

// Get all admins
export const getAllAdmins = async () => {
  try {
    const response = await api.get(`${API_ENDPOINTS.ADMIN_MANAGEMENT}/admins`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Invite new admin
export const inviteAdmin = async (adminData) => {
  try {
    const response = await api.post(`${API_ENDPOINTS.ADMIN_MANAGEMENT}/invite`, adminData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update admin
export const updateAdmin = async (adminId, updateData) => {
  try {
    const response = await api.put(`${API_ENDPOINTS.ADMIN_MANAGEMENT}/update/${adminId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete admin
export const deleteAdmin = async (adminId) => {
  try {
    const response = await api.delete(`${API_ENDPOINTS.ADMIN_MANAGEMENT}/delete/${adminId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Change password
export const changePassword = async (passwordData) => {
  try {
    const response = await api.put(`${API_ENDPOINTS.ADMIN_MANAGEMENT}/change-password`, passwordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Toggle admin status (activate/deactivate)
export const toggleAdminStatus = async (adminId, currentStatus) => {
  try {
    const response = await api.put(`${API_ENDPOINTS.ADMIN_MANAGEMENT}/update/${adminId}`, {
      isActive: !currentStatus
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
