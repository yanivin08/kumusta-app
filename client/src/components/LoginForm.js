import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'

export default class LoginForm extends React.Component {
    render() {
        return (
            <div className="loginform">
                Login Form
                <div className="box">
                    <InputField 
                        placeholder="Username"
                    />
                    <InputField 
                        placeholder="Password"
                    />
                    <SubmitButton 
                        classname="btn"
                        value="LOG IN"
                    />
                </div>
            </div>
        );
    }
}