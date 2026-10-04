import { api } from './index';

export const getMyProfile = async () => {
  const response = await api.get('/api/profile/me');
  return response.data;
};

export const updateMyProfile = async (profile) => {
  const response = await api.put('/api/profile/me', profile);
  return response.data;
};

export const uploadMyResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  const response = await api.post('/api/profile/me/resume', formData);
  return response.data;
};

export const uploadMyProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append('profilePicture', file);
  const response = await api.post('/api/profile/me/picture', formData);
  return response.data;
};
