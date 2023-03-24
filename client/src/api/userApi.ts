// import axios from 'axios';

// import { User } from '../types/user';

// const API_BASE_URL = 'http://localhost:8000/api/';

// export const getUserDetails = async (): Promise<User> => {
//   const { data } = await axios.get(API_BASE_URL + 'users/me/');
//   return data;
// };

// ////

// import axios from 'axios';
// import { User } from '../types/user';

// export const getUserDetails = async () => {
//   try {
//     const response = await axios.get<User>('/api/user/details');
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

//

import axios from 'axios';
import { User } from '../types/user';

export const getUserDetails = async (): Promise<User> => {
  const response = await axios.get<User>('/users/me', {
    withCredentials: true,
  });
  return response.data;
};
