import axios from 'axios';

/**
 * API Layer
 * Centralized API client with JWT auth handling
 */

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mectov_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (expired/invalid token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('mectov_token');
      localStorage.removeItem('mectov_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// --- Auth ---
export const login = (username, password) =>
  api.post('/login', { username, password });

// --- Projects ---
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// --- Project Control ---
export const startProject = (id) => api.post(`/projects/${id}/start`);
export const stopProject = (id) => api.post(`/projects/${id}/stop`);
export const restartProject = (id) => api.post(`/projects/${id}/restart`);

// --- Logs ---
export const getProjectLogs = (id) => api.get(`/projects/${id}/logs`);

// --- Nginx Config ---
export const getNginxConfig = (id) => api.get(`/projects/${id}/nginx-config`);

// --- Server ---
export const getServerStatus = () => api.get('/server/status');

export default api;
