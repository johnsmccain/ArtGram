import axios from 'axios';
import { Token } from '../types/token';

export const refreshAccessToken = async (): Promise<Token> => {
  const response = await axios.post<Token>(
    'refresh',
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const revokeRefreshToken = async (): Promise<void> => {
  await axios.post('/api/token/revoke', {}, { withCredentials: true });
};
