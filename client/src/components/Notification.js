import React, { Component } from 'react'

export class Notification extends Component {
    render() {
        return (
            <div className={"notification is-" + this.props.notif.type }>
                <button className="delete" aria-label="delete" onClick={this.props.remove}></button>
                {this.props.notif.message}
            </div>
        )
    }
}

export default Notification
