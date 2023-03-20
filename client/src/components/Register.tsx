import { useState } from 'react';
import { signupFields } from "../constants/formFields";
import FormAction from './FormAction';
import Input from "./Input";
import axios from 'axios';

const fields = signupFields;
let fieldsState: any = {};
fields.forEach(field => fieldsState[field.id] = '');

const Register = () => {
    const [registerState, setRegisterState] = useState(fieldsState);

    const handleChange = (e: { target: { id: any; value: any; }; }) => {
        setRegisterState({ ...registerState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(registerState)
        createAccount();
    }

    const createAccount = async () => {
        // Create Account
        const userInput = {
            name: registerState['username'],
            email: registerState['email-address'],
            password: registerState['password']
        }
        console.log(`The details are ${userInput.email} and ${userInput.password}`);
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:5000/signup',
            data: userInput
        });
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={registerState[field.id]}
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
            <FormAction handleSubmit={handleSubmit} text="Signup" />


        </form>
    )
}
export default Register;