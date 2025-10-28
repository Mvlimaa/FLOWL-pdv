import axios, { AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Change to local development server first
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      console.error('Network error - Please check your connection');
      return Promise.reject(new Error('Network error'));
    }

    switch (error.response.status) {
      case 401:
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 404:
        console.error('Resource not found');
        break;
      case 500:
        console.error('Server error');
        break;
    }

    return Promise.reject(error);
  }
);

export default api;

const handleLogin = async (credentials: { email: string; password: string }) => {
  try {
    const { data } = await api.post('/usuarios/login', credentials);
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      // Navigate to dashboard or home
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        alert('Connection timeout - Please try again');
      } else if (!error.response) {
        alert('Network error - Please check your connection');
      } else {
        alert(error.response.data.message || 'Login failed');
      }
    }
  }
};