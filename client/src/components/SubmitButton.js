import React from 'react'

export default class SubmitButton extends React.Component {
    render() {
        return (
            // <div className="submitbutton">
                <button
                    className={ this.props.classname }
                    disabled={ this.props.disabled }
                    value={ this.props.value }
                    onClick={ () => this.props.onclick() }
                >
                    { this.props.text }
                </button>
            // </div>
        );
    }
}