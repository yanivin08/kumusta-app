import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import Notification from './Notification'
import UserStore from './UserStore'

import { Redirect } from "react-router-dom";

export default class LoginForm extends React.Component {

    state = {
        username: "",
        password: "",
        isLoggedIn: false,
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

    resetForm(){
        this.setState({
            username: "",
            password: "",
            buttonDisabled: false
        })
        
        Array.from(document.getElementsByTagName('input'))
        .forEach(elem => elem.value = "");
    }

    async login(){
        if(!this.state.username || !this.state.password){
            this.setState({
                isLoggedIn: false,
                notif: {
                    active: true,
                    type: "danger",
                    message: "Please fill in all fields!"
                }
            });
        }else{
            this.setState({buttonDisabled: true});

            try {
                let request = await fetch('/user/login', {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.state.username,
                        password: this.state.password
                    })
                });

                let result = await request.json();

                if (result && result.success) {
                    // this.resetForm();
                    
                    UserStore.isLoggedIn = true;
                    UserStore.username = this.state.username;
                    UserStore.access_token = result.access_token;

                    this.setState({
                        isLoggedIn: true,
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
        if(this.state.isLoggedIn === true && this.state.username !== '') {
            return (
                <Redirect to={`/chat`}></Redirect>
            )
        }
        return (
            <div className="column loginform">
                <h3 className="title is-3">Login</h3>
                {this.state.notif.active && <Notification remove={this.removeMessage} notif={this.state.notif}/>}
                <div className="field">
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
                    <div className="level">
                        <div className="level-left">
                            <div className="control">
                                <SubmitButton 
                                    classname="button is-info"
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
