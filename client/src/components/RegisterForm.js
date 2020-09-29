import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import Spacer from './Spacer'

export default class RegisterForm extends React.Component {
    render() {
        return (
            <div className="column registerform">
                <h3 className="title is-3">Register</h3>
                <div className="field">
                    <div className="control">
                        <InputField 
                            type="text"
                            classname="input"
                            placeholder="Username"
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <InputField 
                            type="password"
                            classname="input"
                            placeholder="Password"
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <SubmitButton 
                            classname="button is-info"
                            value="REGISTER"
                        />
                    </div>
                </div>

            </div>
        );
    }
}