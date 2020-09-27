import React from 'react'

export default class SubmitButton extends React.Component {
    render() {
        return (
            <div className="submitbutton">
                <input
                    className={this.props.classname}
                    type="button"
                    value={this.props.value}
                    onClick={this.props.onClick}
                >
                </input>
            </div>
        );
    }
}