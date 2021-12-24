import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_END_POINT,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  }, 
  (error) => {
  if(error.message == 'Request failed with status code 401'){
    localStorage.clear();
  }
  return Promise.reject(error.message);
});



export default api;