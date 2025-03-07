
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:6999', // Backend API URL
  withCredentials: true, // To send cookies (JWT token) with each request
});

export default axiosInstance;