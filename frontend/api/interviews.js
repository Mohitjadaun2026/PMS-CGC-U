import { api } from './index';

export const getAllInterviewExperiences = async () => {
    const res = await api.get('/api/interview-experiences');
    return res.data;
};

export const addInterviewExperience = async (data) => {
  const res = await api.post('/api/interview-experiences', {
    name: data.name,
    email: data.email,
    contact: data.contact,
    branch: data.branch,
    graduationYear: data.graduationYear,
    companyName: data.companyName,
    role: data.role,
    ctc: data.ctc,
    stipend: data.stipend,
    interviewDate: data.interviewDate,
    experience: data.experience,
    rating: data.rating,
    tags: data.tags,
    customTag: data.customTag,
    rounds: data.rounds
  });
  return res.data;
};


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