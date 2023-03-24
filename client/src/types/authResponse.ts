import { User } from './user';

export interface AuthResponse {
  refreshToken: string;
  accessToken: string;
  token: string;
  user: User;
}
