import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            buttonDisabled: false
        }
    }

    setInputValue(property, val) {
        val = val.trim();
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState({
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            buttonDisabled: false
        })
    }

    async register(){
        // validate if all fields are not empty. do not allow if one is left blank
        if (!this.state.username){return;}
        if (!this.state.email){return;}
        if (!this.state.password){return;}
        if (!this.state.confirmpassword){return;}
        
        // disable button to prevent multiple request
        this.setState({buttonDisabled: true});

        try {
            let userdata = JSON.stringify({
                name: this.state.username,
                email: this.state.email,
                password: this.state.password,
                password2: this.state.confirmpassword
            })

            let request = await fetch('/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: userdata
            });

            let result = await request.json();

            if (result && result.success) {
                console.log(result);

                this.resetForm();
                alert(result.msg);
            }
            else if (result && result.success == false) {
                this.resetForm();
                alert(result.msg);
            }
        }
        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {
        return (
            <div className="column registerform">
                <h3 className="title is-3">Registration</h3>
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <InputField 
                            type="text"
                            classname="input"
                            placeholder="Username"
                            onChange={ (val) => this.setInputValue('username', val) }
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <InputField 
                            type="text"
                            classname="input"
                            placeholder="Email"
                            onChange={ (val) => this.setInputValue('email', val) }
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <InputField 
                            type="password"
                            classname="input"
                            placeholder="Password"
                            onChange={ (val) => this.setInputValue('password', val) }
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <InputField 
                            type="password"
                            classname="input"
                            placeholder="Confirm Password"
                            onChange={ (val) => this.setInputValue('confirmpassword', val) }
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <SubmitButton 
                            classname="submitbutton button is-normal is-info"
                            text="REGISTER"
                            disabled={ this.state.buttonDisabled }
                            onclick={ () => this.register() }
                        />
                    </div>
                </div>

            </div>
        );
    }
}