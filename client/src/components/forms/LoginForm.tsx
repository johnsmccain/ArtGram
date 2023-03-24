import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';


interface LoginFormValues {
    email: string;
    password: string;
}


const LoginForm = () => {
    const { login } = useAuth();
    const [formValues, setFormValues] = useState<LoginFormValues>({
        email: '',
        password: '',
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(formValues.email, formValues.password);
    };

    return (

        <form onSubmit={handleSubmit}>
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
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input id="remember" type="checkbox" value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                </div>
                <label htmlFor="remember"
                    className="ml-2 text-sm font-medium text-white">Remember me</label>
            </div>
            <button type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>

    );
};

export default LoginForm;
