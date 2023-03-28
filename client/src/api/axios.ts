import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // replace with your server's URL
  withCredentials: true,
  headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') },
});

export default instance;
