import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // ajusta si tu backend está en otro puerto
});

// Interceptor para adjuntar el token en cada petición
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;