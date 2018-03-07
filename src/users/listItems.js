import React, { Component } from 'react';


class UserList extends Component {
	render() {
		const listItems = this.props.users.map((user) =>
			// <li className="list-group-item" key={user.userId}>
			// 	<img src={user.avatar} className="avt-list" />
			// 	<span>{user.name}</span>

			// </li >
			<li className="list-group-item" key={user.userId}>

				<div className="media">
					<img className="avatar" alt={user.name} src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png" />
					<div className="media-body">
						<a className="">{user.name}</a>
						<div className="actions-list">
							{/* <span className="badge badge-default badge-pill">14</span> */}
							<button className="prof-action btn btn-default">message</button>
							<button className="prof-action btn btn-default">view</button>
						</div>
					</div>
				</div>
			</li>
		);
		return (
			<div >
				<ul className="list-group">{listItems}</ul>
			</div >
		);
	}
}

export default UserList;