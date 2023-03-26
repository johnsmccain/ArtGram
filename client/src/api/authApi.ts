import axios from 'axios';

import { AuthResponse } from '../types/authResponse';

const API_BASE_URL = 'http://localhost:5000';

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await axios.post(API_BASE_URL + '/login', {
    email,
    password,
  });
  return data;
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const { data } = await axios.post(API_BASE_URL + '/signup/', {
    name,
    email,
    password,
  });
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await axios.post(API_BASE_URL + '/ogout/');
};
