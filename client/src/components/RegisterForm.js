import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import Notification from './Notification'

export default class RegisterForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            buttonDisabled: false,
            notif: {
                active: false,
                type: "",
                message: ""
            }
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

    removeMessage = () => {
        this.setState({
            notif: { ...this.state.notif, active: !this.state.notif.active }
        })
    }

    async register(){
        if(!this.state.username || !this.state.email || !this.state.password || !this.state.confirmpassword){
            this.setState({
                notif: {
                    active: true,
                    type: "danger",
                    message: "Please fill in all fields!"
                }
            })
            return;
        }
        
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
                
                this.resetForm();

                this.setState({
                    notif: {
                        active: true,
                        type: "success",
                        message: result.msg
                    }
                })

            }
            else if (result && result.success === false) {
                this.resetForm();
                this.setState({
                    notif: {
                        active: true,
                        type: "danger",
                        message: result.msg
                    }
                })
            }
        }
        catch(e) {
            console.log(e);
            this.resetForm();
        }
    }

    render() {
        console.log(this.state.notif)
        return (
            
            <div className="column registerform">
                <h3 className="title is-3">Register</h3>
                {this.state.notif.active && <Notification remove={this.removeMessage} notif={this.state.notif}/>}
                <div className="field">
                    <label className="label">Username</label>
                    <div className="control">
                        <InputField 
                            type="text"
                            className="input"
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
                            className="input"
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
                            className="input"
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
                            className="input"
                            placeholder="Confirm Password"
                            onChange={ (val) => this.setInputValue('confirmpassword', val) }
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="level">
                        <div className="level-right">
                            <div className="control">
                                <SubmitButton 
                                    className="submitbutton button is-normal is-info"
                                    text="REGISTER"
                                    disabled={ this.state.buttonDisabled }
                                    onclick={ () => this.register() }
                                />
                            </div>
                        </div>
                        <div className="level-left">
                            <a onClick={this.props.showForms}>Login</a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}