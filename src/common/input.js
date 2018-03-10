import React, { Component } from 'react';

class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };

    }
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.name} className="col-sm-2 control-label">{this.props.name.toUpperCase()}</label>
                <div className="col-sm-10">
                    {(this.props.required) ?
                        <input value={this.props.value}
                            required
                            onChange={this.props.handler}
                            id={this.props.name}
                            type={this.props.type} name={this.props.name} className="form-control" />
                        :
                        <input value={this.props.value}
                            onChange={this.props.handler}
                            id={this.props.name}
                            type={this.props.type} name={this.props.name} className="form-control" />
                    }
                </div>
            </div>

        )
    }
}

export default Input;