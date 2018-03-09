import React, { Component } from 'react';
import { services } from './services/chaty-service';
import { cookies_services } from './services/cookies-service';

import Input from './input';

const common = require('./services/encrypt-service').encode;

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			prof: '',
			friend:false
		}
		this.state.currentUser = this.state.user = JSON.parse(cookies_services.getCookie('currUser'));
		this.state.user.password = common.b64DecodeUnicode(this.state.user.password);
		this.state.prof = this.state.currentUser.avatar;
	}
	submitFileChange = (e) => {
		e.preventDefault();
		services.uploadAvatar({
			avatar: this.state.currentUser.avatar,
			userId: this.state.currentUser.userId,
			connectionId: this.state.currentUser.connectionId
		}).then((res) => {
			this.setState(prevState => ({
				currentUser: {
					...prevState.currentUser,
					avatar: res
				}
			}));
			cookies_services.setCookie('currUser', JSON.stringify(this.state.currentUser));
			alert('avatar changed successfully');
		}).catch((err) => { console.log(err) });
	}
	fileChange = (ele) => {
		const _this = this;
		const input = ele.target;
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = (e) => {
				_this.setState(prevState => ({
					currentUser: {
						...prevState.currentUser,
						avatar: e.target.result
					},
					prof: e.target.result
				}))
			};
			reader.readAsDataURL(input.files[0]);
		}
	}
	handler = (e) => {
		// e.preventDefault()
		this.setState({
			user: Object.assign(
				this.state.currentUser,
				{ [e.target.name]: e.target.value }
			)
		});
	}
	updateUser = (e) => {
		e.preventDefault();
		services.updateUser(this.state.currentUser.userId, this.state.user)
			.then(res => {
				if (res.data != null) {
					const obj = res.data;
					cookies_services.setCookie('currUser', JSON.stringify(obj))
					alert(res.message);
				}
			})
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3 col-sm-3 col-xm-3">
						<div className="profile-sidebar">
							<div className="profile-userpic">
								<img src={this.state.currentUser.avatar} className="img-responsive" alt="" />
							</div>

							<div className="profile-usertitle">
								<div className="profile-usertitle-name">{this.state.currentUser.name}</div>
								<div className="profile-usertitle-job">{this.state.currentUser.email}</div>
							</div>
							{(this.state.friend) ?
								<div className="profile-userbuttons">
									<button type="button" className="btn btn-success btn-sm">Follow</button>
									<button type="button" className="btn btn-danger btn-sm">Message</button>
								</div>
								: ''}

							<div className="profile-usermenu">
								<ul className="nav">
									<li>
										<a href="/overview">
											<i className="glyphicon glyphicon-home"></i>
											Overview </a>
									</li>
									<li className="active">
										<a href="/profile">
											<i className="glyphicon glyphicon-user"></i>
											Account Settings </a>
									</li>
									<li>
										<a href="/profile/tasks" target="_blank">
											<i className="glyphicon glyphicon-ok"></i>
											Tasks </a>
									</li>
									<li>
										<a href="/profile/help">
											<i className="glyphicon glyphicon-flag"></i>
											Help </a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="col-md-9 col-sm-9 col-xm-9">
						<div className="profile-content">
							<div className="prof-container">
								<form onSubmit={this.submitFileChange}>
									<span className="btn-file">
										<img src={this.state.prof} className="prof-responsive" alt="" />
										<input type="file" className="form-control-file" id="file" aria-describedby="fileHelp" onChange={this.fileChange} />
									</span>
									<button type="submit" className="btn btn-primary right">Change</button>
								</form>
							</div>
							<div className="body-user">
								<form className="form-horizontal" onSubmit={this.updateUser}>
									<Input type="text" name="name" required={true} value={this.state.user.name} handler={this.handler} />
									<Input type="email" name="email" required={true} value={this.state.user.email} handler={this.handler} />
									<Input type="password" name="password" required={true} value={this.state.user.password} handler={this.handler} />
									<input type="submit" className="btn btn-chaty right" value="Update" />
								</form>
							</div>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;