import React, { Component } from 'react';
import { services } from './services/chaty-service';
import { cookies_services } from './services/cookies-service';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: {},
      content: '',
      messages: [],
      hubConnection: null,
      tlk: {},
      friends: []
    };
    this.state.currentUser = JSON.parse(cookies_services.getCookie('currUser'));

  }
  componentWillMount = () => {
    this.getInit();
  }
  componentDidMount = () => {
    this.props.hubConnection.on('sendPM', (receivedMessage) => {
      console.log(receivedMessage);
      this.state.messages.push(receivedMessage);
      this.setState({
        messages: this.state.messages
      })
    });

    this.props.hubConnection.on('newUser', (user) => {
      this.state.friends.push(user);
      this.setState({
        friends: this.state.friends
      })
    });
  }

  sendMessage = () => {
    this.setState({
      message: Object.assign(
        this.state.message,
        {
          toUser: this.state.currentUser,
          fromUserId: this.state.currentUser.userId,
          status: false,
          toUserId: this.state.tlk.userId
        }
      )
    });

    this.props.hubConnection
      .invoke('sendPM', this.state.message)
      .catch(err => console.error(err));
  };

  getInit = () => {
    services.getFriends()
      .then((res) => {
        if (res.data)
          this.setState({
            friends: res.data
          });
        else alert(res.message);
      })
      .catch((err) => { console.log(err) });
  }
  tlk = (user, e) => {
    this.setState({
      tlk: user
      // Get prev msgs
    });
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="lstusers col-4 col-sm-4 col-md-4">
            <div id="sidebar" className="reference-list reference-list-right has-navbar">
              <ul className="list-group">
                {this.state.friends.map((user, index) => (
                  <li className="profile" key={user.userId} onClick={this.tlk.bind(this, user)}>
                    <div className="">
                      <img alt={user.name} src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png" className="avatar" />
                      <a className="username"> {user.name} </a>
                    </div>
                    <span className={(user.status) ? 'status online' : 'offline'}></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-8 col-sm-8 col-md-8">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span> Chat
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                        <span className="glyphicon glyphicon-chevron-down"></span>
                      </button>
                    </div>
                  </div>
                  <div className="panel-body">

                  </div>
                  <div className="panel-footer">
                    <div className="input-group">
                      <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..."
                        onChange={e => this.setState({ message: { content: e.target.value } })}
                      />
                      <span className="input-group-btn">
                        <button className="btn btn-warning btn-sm" id="btn-chat" onClick={this.sendMessage}>
                          Send</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="content">
              {this.state.messages.map((message, index) => (
                <div className="message" key={index}>
                  <span style={{ display: 'block' }} > {message.content} </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default Chat;