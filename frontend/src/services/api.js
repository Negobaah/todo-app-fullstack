// src/services/api.js
import axios from 'axios';

const api = axios.create({
    // ANTES: baseURL: 'http://localhost:5000/api',
    baseURL: process.env.REACT_APP_API_URL, 
});

// ... o resto do arquivo continua exatamente igual ...
api.interceptors.request.use(async (config) => {
    const userData = localStorage.getItem('user');
    if (userData) {
        const token = JSON.parse(userData).token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;