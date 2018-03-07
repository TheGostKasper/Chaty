import React, { Component } from 'react';


class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    hideModal = () => {

    }
    render() {
        return (
            <div >
                <div className={(this.props.modal.showClass) ? "modal fade showModal" : "modal fade"} id="myModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.props.modal.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.close}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {/* dangerouslySetInnerHTML={{__html:this.props.modal.body}} */}
                            <div className="modal-body" >
                                <pre>{this.props.modal.body}</pre>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={this.props.close}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={this.props.submit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Modal;