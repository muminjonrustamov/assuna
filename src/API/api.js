import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // 👈 добавь /api здесь
});

export default api;
