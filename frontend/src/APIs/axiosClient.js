import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    const statusCode = error.response.status;
    if (statusCode === 404) {
      // window.location.href = '/not-found';
      // return;
    }
    if (statusCode === 401) {
      window.location.href = '/dang-nhap';
      return;
    }
    if (statusCode === 403) {
      console.log("Forbidden");
      window.location.href = '/dang-nhap';
      return;
    }
    if (statusCode === 500) {
      // show notification
      return;
    }
    throw error;
  },
);

export default axiosClient;