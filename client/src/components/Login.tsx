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

            // const auth = window.btoa(`${userInput.email}:${userInput.password}`)
            // console.log(auth)
            // console.log(`The details are ${userInput.email} and ${userInput.password}`);
            const response = await axios({
                method: 'POST',
                url: `${SERVER_URL}/login`,
                data: userInput,
            })
            localStorage.setItem('user', JSON.stringify(response));
            navigate('/')

        } catch (error) {
            console.log('Invalid login')
        }

    }


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
            <FormAction handleSubmit={handleSubmit} text="Login" />


        </form>
    )
}
export default Login;