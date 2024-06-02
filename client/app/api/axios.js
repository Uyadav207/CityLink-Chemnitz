import axios from 'axios';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

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
      } else if (err.response && err.response.status === 404) {
        // toast.error("Invalid Endpoint. Try again");
        // return false;
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
