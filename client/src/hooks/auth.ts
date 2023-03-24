import { useState, useEffect } from 'react';
import axios from 'axios';

type User = {
  name: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
};

type LoginParams = {
  email: string;
  password: string;
};

type SignupParams = {
  name: string;
  email: string;
  password: string;
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      setAuthState({
        user: JSON.parse(user),
        token,
      });
    }
  }, []);

  const login = async ({ email, password }: LoginParams) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({ user, token });
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async ({ name, email, password }: SignupParams) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setAuthState({ user, token });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      setAuthState({ user: null, token: null });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    user: authState.user,
    token: authState.token,
    login,
    signup,
    logout,
  };
};
