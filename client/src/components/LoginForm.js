import React from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'
import Notification from './Notification'

export default class LoginForm extends React.Component {

    state = {
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
                    <div className="level">
                        <div className="level-left">
                            <div className="control">
                                <SubmitButton 
                                    classname="button is-info"
                                    value="LOG IN"
                                    text="Login"
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