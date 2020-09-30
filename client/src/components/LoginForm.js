import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'

export default class LoginForm extends React.Component {
    render() {
        return (
            <div className="column loginform">
                <h3 className="title is-3">Login</h3>
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
                            value="LOG IN"
                        />
                    </div>
                </div>
            </div>
        );
    }
}