import api from './api';

export const userRegister = async (data) => await api.post('/auth/register', data);

export const userLogin = async (data) => await api.post('auth/login', data);

export const userLogout = async () => await api.get('auth/logout');