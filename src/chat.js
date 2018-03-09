import React, { Component } from 'react';
import { services } from './services/chaty-service';
import { cookies_services } from './services/cookies-service';
const common = require('./services/common-service').helpers;

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: {},
      content: '',
      messages: [],
      hubConnection: null,
      tlk: null,
      chatters: [],
      prevMsgs: [],
      page: 1
    };
    this.state.currentUser = JSON.parse(cookies_services.getCookie('currUser'));

  }
  componentWillMount = () => {
    this.getInit();
  }
  componentDidMount = () => {
    this.props.hubConnection.on('sendPM', (receivedMessage) => {
      this.setState({
        chatters: this.state.chatters.map(e => {
          e.content = (e.user.userId === receivedMessage.user.userId) ? receivedMessage.content : e.content; return e;
        })
      });
      if (this.state.tlk && this.state.tlk.userId === receivedMessage.user.userId) {
        this.appendAndSet("prevMsgs", receivedMessage, this.state.prevMsgs)
      }
    });

    this.props.hubConnection.on('newUser', (user) => {
      // this.state.chatters.push(user);
      // this.setState({
      //   chatters: this.state.chatters
      // })
    });
    this.props.hubConnection.on('read', (userId) => {
      this.setState({
        chatters: this.state.chatters.map(e => {
          e.status = (e.toUserId === userId) ? true : false; return e;
        })
      });
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
  appendAndSet = (stateName, value, stateObj) => {
    stateObj.push(value);
    this.setState({
      state: stateObj
    })
  }
  getInit = () => {
    services.getChatters(this.state.currentUser.userId)
      .then((res) => {
        console.log(res.data)
        if (res.data)
          this.setState({
            chatters: res.data
          });
        else alert(res.message);
      })
      .catch((err) => { console.log(err) });
  }
  tlk = (user, index, e) => {
    this.setState({
      tlk: user,
    });
    common.highlightDiv(index, ".profile");
    this.getFeeds(user);
  }
  scrollFeeds = () => {

  }
  getFeeds = (user) => {
    services.getMessages({ fromUser: this.state.currentUser.userId, toUser: user.userId, page: this.state.page, pageSize: 20 })
      .then((res) => {
        if (res.data)
          this.setState({
            prevMsgs: res.data.reverse()
          });
        else alert(res.message);
        common.scrollToBottom(".panel-body");
      })
      .catch((err) => { console.log(err) });
  }
  read = () => {
    if (this.state.tlk)
      this.props.hubConnection
        .invoke('readMessages', { fromUser: this.state.currentUser.userId, toUser: this.state.tlk.userId })
        .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="lstusers col-4 col-sm-4 col-md-4 col-xs-4">
            <div id="sidebar" className="reference-list reference-list-right has-navbar">
              <ul className="list-group">
                {this.state.chatters.map((msg, index) => (
                  <li className="profile" key={msg.messageId} onClick={this.tlk.bind(this, msg.user, index)}>
                    <div className="media">
                      <img className="avatar" alt={msg.user.name} src={(msg.user.avatar != null) ? msg.user.avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png"} />
                      <div className="media-body">
                        <a className="">{msg.user.name} </a>
                        <p className={(msg.status) ? 'read content-wrap' : 'unread content-wrap'}>{msg.content}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-8 col-sm-8 col-md-8 col-xs-8">
            <div className="row">
              <div className="col-md-12">
                <div className="panel panel-primary">
                  <div className="panel-heading">
                    <span className="glyphicon glyphicon-comment"></span> {(this.state.tlk) ? this.state.tlk.name : 'Pick a pow'}
                    <div className="btn-group pull-right">
                      <button type="button" className="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                        <span className="glyphicon glyphicon-chevron-down"></span>
                      </button>
                    </div>
                  </div>
                  <div className="panel-body" onScroll={this.scrollFeeds}>
                    {this.state.prevMsgs.map((message, index) => (
                      <div className={(message.fromUserId === this.state.currentUser.userId) ? 'messages direction_rtl' : 'messages right'} key={index}>
                        <span className={(message.fromUserId === this.state.currentUser.userId) ? 'msg blue' : 'msg gray'}> {message.content} </span>
                      </div>
                    ))}
                  </div>
                  <div className="panel-footer">
                    <div className="input-group">
                      <input id="btn-input" type="textarea" className="form-control input-sm" placeholder="Type your message here..."
                        onChange={e => this.setState({ message: { content: e.target.value } })}
                        onClick={this.read}
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