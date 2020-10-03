import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import Notification from './Notification'

export default class LoginForm extends React.Component {

    state = {
        username: "",
        password: "",
        notif: { 
            active: false,
            type: "",
            message: ""
        }
    }

    removeMessage = () => {
        this.setState({
            notif: { ...this.state.notif, active: !this.state.notif.active }
        })
    }

    setInputValue(property, val){
        val = val.trim();
        this.setState({
            [property]: val
        })
    }

    async login(){
        if(!this.state.username || !this.state.password){
            this.setState({
                notif: {
                    active: true,
                    type: "danger",
                    message: "Please fill in all fields!"
                }
            })
        }else{
            this.setState({buttonDisabled: true});

            try {
                let userdata = JSON.stringify({
                    name: this.state.username,
                    password: this.state.password
                })

                let request = await fetch('/user/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: userdata
                });

                let result = await request.json();

                if (result && result.success) {
                    // this.resetForm();
                    this.setState({
                        notif: {
                            active: true,
                            type: "success",
                            message: result.msg
                        }
                    });
                }
                else if (result && result.success === false) {
                    // this.resetForm();
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
                // this.resetForm();
            }
        }
    }

    render() {
        console.log(this.props.showForms);
        return (
            <div className="column loginform">
                <h3 className="title is-3">Login</h3>
                {this.state.notif.active && <Notification remove={this.removeMessage} notif={this.state.notif}/>}
                <div className="field">
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
                    <div className="level">
                        <div className="level-left">
                            <div className="control">
                                <SubmitButton 
                                    className="button is-info"
                                    value="LOG IN"
                                    text="Login"
                                    onclick={ () => this.login() }
                                />
                            </div>
                        </div>
                        <div className="level-right">
                            <a onClick={this.props.showForms}>Register</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}