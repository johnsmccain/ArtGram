import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from './FormAction';
import Input from "./Input";
import axios from 'axios';
import { SERVER_URL } from '../constants/serverUrl'
import { useNavigate } from 'react-router-dom';

const fields = loginFields;
let fieldsState: any = {};
fields.forEach(field => fieldsState[field.id] = '');

const Login = () => {
    const navigate = useNavigate()
    const [loginState, setLoginState] = useState(fieldsState);

    const handleChange = (e: any) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // console.log(typeof loginState)
        authenticateUser();
    }

    const authenticateUser = async () => {
        // Create Account
        try {
            const userInput = {
                email: loginState['email-address'],
                password: loginState['password']
            }

            const response = await axios({
                method: 'POST',
                url: `${SERVER_URL}/login`,
                data: userInput,
            })
            sessionStorage.setItem('token', response.data.token);
            navigate('/')

        } catch (error) {
            await localStorage.clear();
            console.log('Invalid login')
        }

    }


    return (
        <form className="w-full shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-8 space-y-6 max-w-md" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormAction handleSubmit={handleSubmit} text="Sign In" />
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Forgot Password?
            </a>

        </form>
    )
}
export default Login;