import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Forms from './Forms'

export class StartPage extends Component {
    render() {
        return (
            <div className="columns">
                <div className="column is-4 is-flex has-background-link has-text-centered">
                    <section className="logo title">
                        <FontAwesomeIcon icon="comment-dots" color="white" size="5x"/>
                        <h4 className="title is-5 has-text-white">KUMUSTA APP</h4>
                    </section>
                </div>
                <div className="column is-8 is-flex">
                    <section className="login-form">
                        <Forms/>
                    </section>
                </div>
            </div>
        )
    }
}

export default StartPage
