import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-assuna-1.onrender.com/api', // твой backend
});

// ➝ Продукты
export const getProducts = () => api.get('/products').then(res => res.data);
export const getProductById = (id) => api.get(`/products/${id}`).then(res => res.data);
export const createProduct = (productData) => api.post('/products', productData).then(res => res.data);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData).then(res => res.data);
export const deleteProduct = (id) => api.delete(`/products/${id}`).then(res => res.data);

// ➝ Категории
export const getCategories = () => api.get('/categories').then(res => res.data);
export const getCategoryById = (id) => api.get(`/categories/${id}`).then(res => res.data);
export const createCategory = (categoryData) => api.post('/categories', categoryData).then(res => res.data);
export const updateCategory = (id, categoryData) => api.put(`/categories/${id}`, categoryData).then(res => res.data);
export const deleteCategory = (id) => api.delete(`/categories/${id}`).then(res => res.data);

export default api;