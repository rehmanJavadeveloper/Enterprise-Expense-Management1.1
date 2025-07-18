import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Log detailed request information
    console.log('=== AXIOS REQUEST ===');
    console.log('Method:', config.method?.toUpperCase());
    console.log('URL:', config.url);
    console.log('Base URL:', config.baseURL);
    console.log('Full URL:', config.baseURL + config.url);
    console.log('Headers:', config.headers);
    console.log('Token present:', !!token);
    console.log('=====================');
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('=== AXIOS RESPONSE ===');
    console.log('Status:', response.status);
    console.log('Method:', response.config.method?.toUpperCase());
    console.log('URL:', response.config.url);
    console.log('Data:', response.data);
    console.log('======================');
    return response;
  },
  (error) => {
    console.error('=== AXIOS ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error status:', error.response?.status);
    console.error('Error data:', error.response?.data);
    console.error('Error config:', error.config);
    console.error('Error URL:', error.config?.url);
    console.error('Error method:', error.config?.method);
    console.error('===================');
    
    // Don't auto-redirect on DELETE requests - let the component handle the error
    if (error.config?.method?.toLowerCase() === 'delete') {
      console.log('DELETE request failed, not redirecting automatically');
      return Promise.reject(error);
    }
    
    // Only redirect to login on 401 for GET requests
    if (error.response?.status === 401) {
      const method = error.config?.method?.toLowerCase();
      if (method === 'get') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      } else {
        // For PUT/POST/PATCH, just reject the error and let the component handle it
        return Promise.reject(error);
      }
    } else if (error.response?.status === 403) {
      window.location.href = '/dashboard';
    }
    
    return Promise.reject(error);
  }
);

export default api; 