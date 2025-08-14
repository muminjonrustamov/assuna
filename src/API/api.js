import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-assuna-1.onrender.com/api', 
});

export default api;
