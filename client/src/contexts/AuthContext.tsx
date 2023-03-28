import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { loginUser, signupUser, logoutUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

interface AuthContextData {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children?: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response && error.response.status === 403) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    setUser(null);
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            // fetch user data and set the user state
            axios
                .get('/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                })
                .catch((err) => {
                    console.error('Error fetching user data:', err);
                });
        }

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser(email, password);
            setUser(response.user);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            navigate('/');
        } catch (err) {
            console.error('Error logging in:', err);
            // Handle error (e.g. show error message to user)
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const response = await signupUser(name, email, password);
            setUser(response.user);
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            navigate('/');
        } catch (err) {
            console.error('Error signing up:', err);
            // Handle error (e.g. show error message to user)
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
        } catch (err) {
            console.error('Error logging out:', err);
            // Handle error (e.g. show error message to user)
        }
    };
    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = (): AuthContextData => useContext(AuthContext);

export { AuthProvider, useAuth };
