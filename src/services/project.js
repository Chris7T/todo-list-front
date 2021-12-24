import api from './api';

export const listProjects = async () => await api.get('/project');

export const getProject = async (id) => api.get(`/project/${id}`);

export const createProject = async (data) => api.post('/project', data);

export const updateProject = async (id, data) => api.put(`/project/${id}`, data);

export const deleteProject = async (id) => api.delete(`/project/${id}`);

export const shareProject = async (id) => api.get(`project/generate/${id}`);

export const linkProject = async (key) => api.get(`project/link/${key}`);

export const unlinkProject = async (id) => api.get(`project/unlink/${id}`);

