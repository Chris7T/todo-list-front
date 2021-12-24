import api from './api';

export const listTasks = async (data) => await api.post('/task/list', data);

export const getTasks = async (id) => api.get(`/task/${id}`);

export const createTasks = async (data) => api.post('/task', data);

export const updateTasks = async (id, data) => api.put(`/task/${id}`, data);

export const deleteTasks = async (id) => api.delete(`/task/${id}`);

