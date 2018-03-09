import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HubConnection } from '@aspnet/signalr-client';
import { cookies_services } from './services/cookies-service';
import { services } from './services/chaty-service';

import './App.css';

import Search from './users/search';
import Chat from './chat';
import Login from './login';
import Profile from './profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Mubo',
      port: 'http://localhost:56395',
      hubConnection: null,
      redirect: false,
      notify: false,
      notification: []
    }
    this.state.currentUser = JSON.parse(cookies_services.getCookie('currUser'));
  }

  componentWillMount = () => {
    const hubConnection = new HubConnection(`${this.state.port}/chat`);
    this.setState({ hubConnection }, () => {
      this.state.hubConnection
        .start(() => {
        })
        .then(() => {
          if (this.state.currentUser)
            hubConnection
              .invoke('updateConnectionId', this.state.currentUser.userId)
              .catch(err => console.error(err));
        })
        .catch(err => console.log('Error while establishing connection :('));
    });
    this.getNotification();
  }
  getNotification = () => {
    if (this.state.currentUser)
      services.getNotification(this.state.currentUser.userId)
        .then((e) => {
          this.setState({
            notification: e.data
          })
        }
        ).catch((err) => console.log(err))
  }
  toggleNotify = () => {
      this.setState({ notify: !this.state.notify })
  }
  hideNotify=()=>{
    this.setState({ notify: false })
  }
  componentDidMount = () => {
    this.state.hubConnection.on('changeStatus', (user) => {
      cookies_services.setCookie('connectionId', user.connectionId, 60);
      // console.log(cookies_services.getCookie("connectionId"));
    });
  }
  logout = () => {
    cookies_services.deleteCookies(['token', 'currUser', 'connectionId']);
    document.location.href = "/";
  }
  render() {
    if (this.state.currentUser === null) {
      if (!window.location.href.includes('/login')) {
        return (
          <Router>
            <Route path="*" render={
              props => (
                <Login hubConnection={this.state.hubConnection} />
              )
            } />
          </Router>
        )
      }
    }
    return (
      <Router>
        <div>
          <div className="App">
            <header className="App-header">
              <div className="left">
                <img src={this.state.currentUser.avatar} className="App-logo" alt="logo" />
                <h3 className="title-user">{this.state.currentUser.name}</h3>
              </div>
              <div className="right">

                <h1 className="App-title">
                  <div className="dropdown">
                    <button className="dropbtn" onClick={this.toggleNotify}>
                      <i className="fa fa-bell"></i>
                    </button>
                    <div className={(this.state.notify) ? "dropdown-content block" : "dropdown-content"}>
                      <ul className="list-group">
                        {this.state.notification.map((msg, index) => (
                          <li className="profile" key={msg.messageId} onClick={console.log(this, msg.user, index)}>
                            <div className="media width">
                              <img className="avatar" alt={msg.user.name} src={(msg.user.avatar != null) ? msg.user.avatar : "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-128.png"} />
                              <div className="notiy">
                                <span>{msg.user.name}</span>
                                <p>{msg.content}</p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button className="outbtn" onClick={this.logout}>
                    <i className="fa fa-sign-out"></i>
                  </button>
                </h1>
              </div>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/chat'>Chat</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
              </ul>
            </header>
            <div className="_cont">
              <Switch>
                <Route exact path="/login" render={
                  props => (
                    <Login hubConnection={this.state.hubConnection} />
                  )} />
                <Route exact path="/" render={
                  props => (
                    <Search hubConnection={this.state.hubConnection} />
                  )} />
                <Route exact path="/chat" render={
                  props => (
                    <Chat hubConnection={this.state.hubConnection} />
                  )} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="*" render={props => (
                  <div className="pagenotfound"><h2>Page not found</h2></div>
                )} />
              </Switch>
            </div>
          </div>
        </div>
      </Router >
    );
  }
}

export default App;
