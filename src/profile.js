import React, { Component } from 'react';
import { services } from './services/chaty-service';
import { cookies_services } from './services/cookies-service';


class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			prof:''
		}
		this.state.currentUser = JSON.parse(cookies_services.getCookie('currUser'));		
	}
	submitFileChange = (e) => {
		e.preventDefault();
		services.uploadAvatar({avatar:this.state.prof,userId:this.state.currentUser.userId,connectionId:this.state.currentUser.connectionId})
		.then((res)=>{
			this.setState(prevState => ({
				currentUser: {
					...prevState.currentUser,
					avatar: res
				},
				prof:res
			}))
		})
		.catch((err)=>{console.log(err)});
	}
	fileChange = (ele) => {
		const _this = this;
		const input = ele.target;
		if (input.files && input.files[0]) {
			var reader = new FileReader();
			reader.onload = (e) => {
				_this.setState({
					prof: e.target.result
				})
			};
			reader.readAsDataURL(input.files[0]);
		}
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<div className="profile-sidebar">
							<div className="profile-userpic">
								<img src={this.state.prof} className="img-responsive" alt="" />
							</div>

							<div className="profile-usertitle">
								<div className="profile-usertitle-name">Marcus Doe</div>
								<div className="profile-usertitle-job">Developer</div>
							</div>

							<div className="profile-userbuttons">
								<button type="button" className="btn btn-success btn-sm">Follow</button>
								<button type="button" className="btn btn-danger btn-sm">Message</button>
							</div>

							<div className="profile-usermenu">
								<ul className="nav">
									{/* <li>
										<a href="#">
											<i className="glyphicon glyphicon-home"></i>
											Overview </a>
									</li> */}
									<li className="active">
										<a href="/#">
											<i className="glyphicon glyphicon-user"></i>
											Account Settings </a>
									</li>
									{/* <li>
										<a href="#" target="_blank">
											<i className="glyphicon glyphicon-ok"></i>
											Tasks </a>
									</li>
									<li>
										<a href="#">
											<i className="glyphicon glyphicon-flag"></i>
											Help </a>
									</li> */}
								</ul>
							</div>
						</div>
					</div>
					<div className="col-md-9">
						<div className="profile-content">
							<form onSubmit={this.submitFileChange}>
								<div className="form-group">
									<label >File input</label>
									<input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" onChange={this.fileChange} />
									<small id="fileHelp" className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
								</div>
								<button type="submit" className="btn btn-primary">Submit</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;