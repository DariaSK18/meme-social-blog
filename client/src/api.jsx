import axios from 'axios';

import mockAxios from './mock/api';

const apiAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  console.log('token', token);
  if (token) {
    config.headers.Authorization = `token ${token}`;
  }
  return config;
});

const shouldUseMock = import.meta.env.REACT_APP_USE_MOCK_API === "true";
const api = shouldUseMock ? fakeAxios :apiAxios;

//export default mockAxios
export default api;
