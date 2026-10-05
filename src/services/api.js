import axios from 'axios';

// Centralized Axios Client Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for headers/auth
apiClient.interceptors.request.use(
  (config) => {
    // Generate or attach anonymous citizen/user token if present
    const citizenId = localStorage.getItem('urbanqr_citizen_id') || 'citizen-shikha';
    config.headers['x-user-id'] = citizenId;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API Server Error';
    return Promise.reject({
      status: error.response?.status,
      message,
      data: error.response?.data,
    });
  }
);

// 1. Assets API
export const assetApi = {
  getAssets: (params) => apiClient.get('/assets', { params }),
  getAssetById: (assetId) => apiClient.get(`/assets/${assetId}`),
  createAsset: (assetData) => apiClient.post('/assets', assetData),
  updateAsset: (assetId, data) => apiClient.put(`/assets/${assetId}`, data),
};

// 2. Complaints API
export const complaintApi = {
  getComplaints: (params) => apiClient.get('/complaints', { params }),
  getComplaintById: (id) => apiClient.get(`/complaints/${id}`),
  createComplaint: (complaintData) => apiClient.post('/complaints', complaintData),
  updateComplaint: (id, data) => apiClient.put(`/complaints/${id}`, data),
  assignWorker: (id, workerName) => apiClient.put(`/complaints/${id}/assign`, { workerName }),
  updateStatus: (id, status) => apiClient.put(`/complaints/${id}/status`, { status }),
  confirmComplaint: (id, userId) => apiClient.post(`/complaints/${id}/confirm`, { userId }),
};

// 3. Workers API
export const workerApi = {
  getWorkers: (params) => apiClient.get('/workers', { params }),
  createWorker: (data) => apiClient.post('/workers', data),
  getWorkerById: (id) => apiClient.get(`/workers/${id}`),
  updateStatus: (id, status) => apiClient.put(`/workers/${id}/status`, { status }),
};

// 4. System Health API
export const healthApi = {
  check: () => apiClient.get('/health'),
};
