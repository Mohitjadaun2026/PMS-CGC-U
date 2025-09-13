import { api } from './index';

export const getAllInterviewExperiences = async () => {
    const res = await api.get('/api/interview-experiences');
    return res.data;
};

export const addInterviewExperience = async (data) => {
    const res = await api.post('/api/interview-experiences', {
        company: data.company,
        role: data.role,
        experience: data.experience
    });
    return res.data;
}

export const deleteInterviewExperience = async (id) => {
    const res = await api.delete(`/api/interview-experiences/${id}`);
    return res.data;
};

export const editInterviewExperience = async (id, data) => {
    const res = await api.put(`/api/interview-experiences/${id}`, {
        company: data.company,
        role: data.role,
        experience: data.experience
    });
    return res.data;
}