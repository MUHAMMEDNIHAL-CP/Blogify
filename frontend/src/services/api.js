import axios from 'axios';

const apiUrl = "https://a65202b3-2a1e-4215-9445-05d5aabc49aa-dev.e1-us-east-azure.choreoapis.dev/blogify/backend/v1.0"

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
