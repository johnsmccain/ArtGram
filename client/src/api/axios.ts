import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // replace with your server's URL
  withCredentials: true,
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      return axios
        .post('/refresh', {
          refreshToken,
        })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            return axios(originalRequest);
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
