import axios from 'axios';
import toast from 'react-hot-toast';
import { getUserTokenFromLocalStorage } from '../helpers/crypto';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config here (add headers, authentication tokens)
    const accessToken = getUserTokenFromLocalStorage();
    // If token is present add it to request's Authorization Header
    if (accessToken) {
      if (config.headers)
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);
// End of Request interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    return new Promise(function () {
      if (err.response && err.response.status === 403) {
        console.error(err.response.data.error);
        if (err.response.data.error === 'invalid_token') {
          toast.error(err.response.data.error);
          localStorage.clear();
          setTimeout(() => {
            window.location.replace('/');
          });
          return false;
        }
      } else if (err.response && err.response.status === 401) {
        if (err.response.data.message === 'Invalid token.') {
          toast.error('Token Expired. Please login again');
          localStorage.clear();
          setTimeout(() => {
            window.location.replace('/login');
          });
          return false;
        } else {
          toast.error(err.response.data.error);
        }
      } else if (err.response && err.response.status === 404) {
        // toast.error("Invalid Endpoint. Try again");
        // return false;
      } else if (err.response && err.response.status === 400) {
        toast.error(err.response.data.error);
        // return false;
      } else if (err.response && err.response.status === 500) {
        // toast.error("Internal Server Error");
        toast.error('Internal Server Error');
        return false;
      } else if (err.response && err.response.status === 401) {
        toast.error(err.response.data.error);
      }

      throw err;
    });
  }
);

export default axiosInstance;
