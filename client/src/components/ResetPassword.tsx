import { useState } from 'react';
import { resetFields } from "../constants/formFields";
import FormAction from './FormAction';
import Input from "./Input";
import axios from 'axios';


const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e: any) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(email)
        // resetPassword();
    }

    const resetPassword = async () => {
        //Reset Password
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:5000/resetpassword',
            data: { email: email }
        });
        const data = await response.data;
        return data
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-px">
                <Input
                    handleChange={handleChange}
                    value={resetFields.value}
                    labelText={resetFields.labelText}
                    labelFor={resetFields.labelFor}
                    id={resetFields.id}
                    name={resetFields.name}
                    type={resetFields.type}
                    isRequired={resetFields.isRequired}
                    placeholder={resetFields.placeholder}
                />


            </div>

            <FormAction handleSubmit={handleSubmit} text="Submit" />


        </form>
    )
}
export default ResetPassword;