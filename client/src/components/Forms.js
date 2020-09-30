import React, { Component } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export class Forms extends Component {
    state = {
        register: false
    }

    showForms = () => {
        this.setState({
            register: !this.state.register
        });
        console.log('hey!')
    }

    render() {
        return (
            <div>
                {this.state.register && <RegisterForm showForms={this.showForms} />}
                {!this.state.register && <LoginForm showForms={this.showForms} />}
            </div>
        )

    }
}

export default Forms
