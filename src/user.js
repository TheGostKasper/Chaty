import React, { Component } from 'react';

class User extends Component {
    render() {
        return (
            <div className="user">
                <p>{this.props.firstName} {this.props.lastName} {this.props.age}</p>
            </div>
        );
    }
}

export default User;