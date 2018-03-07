import React, { Component } from 'react';
import Modal from './../common/modal';
import { cookies_services } from './../services/cookies-service';

class UserList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showClass: false,
			target: {},
			message: '',
			targetMessage: {}
		}
		this.state.currentUser = this.state.user = JSON.parse(cookies_services.getCookie('currUser'));

	}
	componentDidMount = () => {
		this.props.hubConnection.on('sendPM', (msg) => {
			alert(msg.content);
		});
	}
	showModal = (user, e) => {
		this.setState({
			target: user,
			showClass: !this.state.showClass
		});
	}
	close = (e) => {
		this.setState({
			showClass: !this.state.showClass
		});
	}
	submit = () => {
		this.setState(prevState => ({
			targetMessage: {
				...prevState.targetMessage,
				toUser: this.state.currentUser,
				fromUserId: this.state.currentUser.userId,
				status: false,
				toUserId: this.state.target.userId,
				content: this.state.message
			}
		}), () => {
			this.sendPM();
		});

	}
	sendPM = () => {
		this.props.hubConnection
			.invoke('sendPM', this.state.targetMessage)
			.catch(err => console.error(err));
		this.close();
	}
	message = (e) => {
		this.setState({
			message: e.target.value
		});
	}

	render() {
		const listItems = this.props.users.map((user) =>
			<li className="list-group-item" key={user.userId}>
				<div className="media">
					<img className="avatar" alt={user.name} src={(user.avatar) ? user.avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png"} />
					<div className="media-body">
						<a className="">{user.name}</a>
						<div className="actions-list">
							<button className="prof-action btn btn-primary" onClick={this.showModal.bind(this, user)}>message</button>
							<button className="prof-action btn btn-info">view</button>
						</div>
					</div>
				</div>
			</li>
		);
		const body =
			<form className="row">
				<div className="col-sm-12">
					<textarea className="form-control" onChange={this.message} />
				</div>
			</form>;
		return (
			<div >
				<ul className="list-group">{listItems}</ul>
				<Modal modal={{ title: "modal", body: body, showClass: this.state.showClass }}
					close={this.close}
					submit={this.submit}
				/>
			</div >
		);
	}
}

export default UserList;