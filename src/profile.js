import React, { Component } from 'react';
import User from './user.js';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		}

		this.state.users = [{ firstName: 'mubo', lastName: 'manga', age: 25 },
		{ firstName: 'Alaa', lastName: 'moe', age: 26 },
		{ firstName: 'Galy', lastName: 'mion', age: 35 }];

	}

	render() {
		return (
			<div className="profile-container">
				<h4>
					hello from profile
				</h4>
				{this.state.users.map((user,index) => <User key={index} {...user} onClick={() => console.log(`you clicked ${user}`)} />)}
			</div>
		);
	}
}

export default Profile;