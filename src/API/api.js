import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-assuna-test.onrender.com/api', 
});

export default api;
