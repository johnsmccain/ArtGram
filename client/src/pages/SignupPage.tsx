import React from 'react';
import { SignupForm } from '../components';

const SignupPage: React.FC = () => {
    return (
        <div>
            <h1>Signup Page</h1>
            <SignupForm onSuccess={function (): void {
                throw new Error('Function not implemented.');
            }} />
        </div>
    );
};

export default SignupPage;
