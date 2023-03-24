import React from 'react';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { UserDetails } from '../components';

const HomePage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div>
            <UserDetails />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default HomePage;
