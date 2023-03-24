import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../types/user';

const UserDetails: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const { name, email } = user as User;

    return (
        <div>
            <h2>User Details</h2>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
        </div>
    );
};

export default UserDetails;
