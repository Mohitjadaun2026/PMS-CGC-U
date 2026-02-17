import { api } from './index';

// ==================== JOBS ====================

export const getAllJobs = async () => {
  const res = await api.get('/api/jobs');
  return res.data;
};

export const getJobsById = async (id) =>{
  const res = await api.get(`/api/jobs/${id}`);
  console.log(res.data);
  return res.data;
}

export const createJob = async (jobData) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  // Check if jobData is FormData
  const isFormData = jobData instanceof FormData;
  
  const res = await api.post('/api/jobs', jobData, {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      // Set Content-Type explicitly based on data type
      ...(isFormData ? {} : { 'Content-Type': 'application/json' })
    }
  });
  return res.data;
};

export const updateJob = async (jobId, jobData) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  // Check if jobData is FormData
  const isFormData = jobData instanceof FormData;
  
  const res = await api.put(`/api/jobs/${jobId}`, jobData, {
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      // Set Content-Type explicitly based on data type
      ...(isFormData ? {} : { 'Content-Type': 'application/json' })
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

// ==================== APPLICATIONS ====================

export const submitApplication = async (applicationData) => {
  // applicationData should be FormData if resume is included
  // CRITICAL: Do NOT set 'Content-Type' header manually
  // Axios must automatically detect FormData and set the boundary
  // Manual Content-Type breaks multipart encoding!
  const res = await api.post('/api/applications/submit', applicationData);
  return res.data;
};

export const getStudentApplications = async (userId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  
  const res = await api.get(`/api/applications/student/${userId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return res.data;
};

export const getJobApplications = async (jobId) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  const res = await api.get(`/api/applications/job/${jobId}`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  return res.data;
};

export const getAllApplications = async () => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  const res = await api.get('/api/applications/all', {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  return res.data;
};

export const updateApplicationStatus = async (applicationId, status, adminNotes) => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  const res = await api.put(`/api/applications/${applicationId}/status`, 
    { status, adminNotes },
    {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    }
  );
  return res.data;
};

export const downloadResume = async (applicationId) => {
  const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
  if (!token) {
    throw new Error('Authentication required');
  }
  
  const res = await api.get(`/api/applications/download/${applicationId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    responseType: 'blob'
  });
  return res.data;
};

export const getApplicationStats = async () => {
  const adminToken = localStorage.getItem('adminToken');
  if (!adminToken) {
    throw new Error('Admin authentication required');
  }
  
  const res = await api.get('/api/applications/stats', {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
  return res.data;
};