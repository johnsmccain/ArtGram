import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';


interface SignupFormProps {
    onSuccess: () => any;
}

interface SignupFormValues {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const SignupForm = ({ }) => {
    const { signup } = useAuth();

    const [formValues, setFormValues] = useState<SignupFormValues>({
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [passwordAgain, setPasswordAgain] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues: any) => ({
            ...prevFormValues,
            [name]: value,
        }))
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signup(formValues.name, formValues.email, formValues.password);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6">
                <label htmlFor="name"
                    className="sr-only">Your name</label>
                <input id="name"
                    type="name"
                    name="Name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email"
                    className="sr-only">Your email</label>
                <input id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password"
                    className="sr-only">Your password</label>
                <input id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="mb-6">
                <label htmlFor="passwordConfimation"
                    className="sr-only">Your password again</label>
                <input id="password-again"
                    type="password"
                    name="password-again"
                    placeholder="Password again"
                    value={formValues.passwordConfirmation}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
            </div>
            <div className="flex items-start mb-6">

                <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Signup</button>
            </div>
        </form>



    );
};

export default SignupForm;
