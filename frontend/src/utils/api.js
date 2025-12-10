import axios from 'axios';

// Use environment variable for production, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getMe: () => api.get('/users/me'),
    updateProfile: (data) => api.put('/users/me', data)
};

// Books API
export const booksAPI = {
    getAll: () => api.get('/books'),
    create: (formData) => {
        return api.post('/books', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    delete: (id) => api.delete(`/books/${id}`)
};

// Purchase API
export const purchaseAPI = {
    buy: (bookId) => api.post('/purchase', { bookId }),
    getHistory: () => api.get('/purchase/history')
};

export default api;
