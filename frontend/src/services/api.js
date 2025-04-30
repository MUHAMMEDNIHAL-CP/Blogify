import axios from 'axios';

const apiUrl = "/choreo-apis/backend-470188808:8000"

const API = axios.create({
  baseURL: 'http://localhost:8000/api/' ? 'http://localhost:8000/api/' : apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach the token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');  // Get token from localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;  // Add token to Authorization header
  }
  return config;
});

export default API;
