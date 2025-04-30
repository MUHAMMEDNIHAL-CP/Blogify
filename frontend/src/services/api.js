import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:8000/api/';
const PROD_API_URL = '/choreo-apis/blogify/backend/v1';

const apiUrl = window.location.hostname === 'localhost' ? LOCAL_API_URL : PROD_API_URL;

const API = axios.create({
  baseURL: apiUrl,
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
