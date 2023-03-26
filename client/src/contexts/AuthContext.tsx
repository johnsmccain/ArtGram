import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types/user';
import { loginUser, signupUser, logoutUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextData {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken) {
            // check if the access token is still valid
            // you can do this by decoding the token and checking its expiration time
            // or by making a request to the server and checking if the token is valid
            // for simplicity, let's assume the token is still valid
            //const user = { name: 'John Doe', email: 'john@example.com' };
            console.log('refresh token is ' + refreshToken)
            axios.get('http://localhost:5000/verify-token', { headers: { Authorization: `Bearer ${refreshToken}` } })
                .then(response => {
                    setUser(response.data.user)
                    navigate('/')
                    console.log(response.data.user.name);
                })
                .catch((err) => {

                    localStorage.removeItem('accessToken')
                });

        }
    }, []);

    const login = async (email: string, password: string) => {
        // console.log(await loginUser(email, password))
        const response = await loginUser(email, password);
        // console.log('This is the login ', + response);
        setUser(response.user);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        navigate('/')

    };

    const signup = async (name: string, email: string, password: string) => {
        const response = await signupUser(name, email, password);
        setUser(response.user);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextData => useContext(AuthContext);

export { AuthProvider, useAuth };
