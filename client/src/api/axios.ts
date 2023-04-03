import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // replace with your server's URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      console.log('refreshing token with ' + refreshToken);
      return axiosInstance.get('/refresh').then((response) => {
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          return axiosInstance(originalRequest);
        }
      });
    }

    // if (error.response && error.response.status === 401) {
    //     localStorage.removeItem('accessToken');
    //     localStorage.removeItem('refreshToken');
    //     setUser(null);
    //     navigate('/login');
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
