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



    // useEffect(() => {
    //     axios.interceptors.request.use(
    //         request => {
    //             const accessToken = localStorage.getItem('accessToken');
    //             if (accessToken) {
    //                 request.headers.Authorization = `Bearer ${accessToken}`;
    //             }
    //             console.log(request);
    //             return request;
    //         },
    //         error => {
    //             return Promise.reject(error);
    //         }
    //     );

    //     axios.interceptors.response.use(
    //         (response) => {
    //             return response;
    //         },
    //         (error) => {
    //             const originalRequest = error.config;
    //             if (error.response.status === 401 && !originalRequest._retry) {
    //                 originalRequest._retry = true;
    //                 const refreshToken = localStorage.getItem('refreshToken');
    //                 return axios
    //                     .post('/refresh', {
    //                         refreshToken,
    //                     })
    //                     .then((response) => {
    //                         if (response.status === 200) {
    //                             localStorage.setItem(
    //                                 'accessToken',
    //                                 response.data.accessToken
    //                             );
    //                             localStorage.setItem(
    //                                 'refreshToken',
    //                                 response.data.refreshToken
    //                             );
    //                             return axios(originalRequest);
    //                         }
    //                     });
    //             }

    //             // if (error.response && error.response.status === 401) {
    //             //     localStorage.removeItem('accessToken');
    //             //     localStorage.removeItem('refreshToken');
    //             //     setUser(null);
    //             //     navigate('/login');
    //             // }
    //             return Promise.reject(error);
    //         }
    //     );

    //     const accessToken = localStorage.getItem('accessToken');

    //     if (accessToken) {
    //         // fetch user data and set the user state
    //         axios
    //             .get('/me', {
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             })
    //             .then((response) => {
    //                 setUser(response.data);
    //             })
    //             .catch((err) => {
    //                 console.error('Error fetching user data:', err);
    //             });
    //     }

    //     return () => {
    //         axios.interceptors.response.eject(interceptor); // eject the interceptor when the component unmounts
    //     };
    // }, [navigate]);

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

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            axios
                .get("/verify-token")
                .then((response) => {
                    setUser(response.data.user);
                    navigate("/");
                })
                .catch((err) => {
                    console.error("Error validating token:", err);
                    //localStorage.removeItem("accessToken");
                    //localStorage.removeItem("refreshToken");
                    setUser(null);
                });
        }
    }, []);


    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
const useAuth = (): AuthContextData => useContext(AuthContext);

export { AuthProvider, useAuth };
