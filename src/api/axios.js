import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // You can also set other defaults here, like headers or timeout
  // headers: { 'Content-Type': 'application/json' },
});

export default api;
