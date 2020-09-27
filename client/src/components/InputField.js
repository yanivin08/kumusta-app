import React from 'react'

export default class InputField extends React.Component {
    render() {
        return (
            <div className="inputfield">
                <input
                    type={this.props.type}
                    className={this.props.classname}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                >
                </input>
            </div>
        );
    }
}