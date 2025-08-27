import { api } from './index';

export const getAllJobs = async () => {
  const res = await api.get('/api/jobs');
  return res.data;
};

export const createJob = async (jobData) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  const res = await api.post('/api/jobs', jobData, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  return res.data;
};

export const updateJob = async (jobId, jobData) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  const res = await api.put(`/api/jobs/${jobId}`, jobData, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  return res.data;
};

export const deleteJob = async (jobId) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  const res = await api.delete(`/api/jobs/${jobId}`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  return res.data;
};

