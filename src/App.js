import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { HubConnection } from '@aspnet/signalr-client';
import { cookies_services } from './services/cookies-service';
// import { services } from './services/chaty-service';


import logo from './logo.svg';
import './App.css';

import FilterList from './filterList';
import Chat from './chat';
import Login from './login';
import Profile from './profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Mubo',
      hubConnection: null,
      port: 'http://localhost:56395',
      urlApi: 'http://localhost:56395/api',
      redirect: false
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

  }
  componentDidMount = () => {
    this.state.hubConnection.on('changeStatus', (user) => {
      cookies_services.setCookie('connectionId', user.connectionId, 60);
      // console.log(cookies_services.getCookie("connectionId"));
    });
  }
  logout = () => {
    cookies_services.deleteCookies(['token','currUser','connectionId']);
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
              <img src={logo} className="App-logo" alt="logo" />
              <div className="right">
                <h1 className="App-title">Welcome {this.state.currentUser.name}
                  <input type="button" className="btn btn-danger" value="Logout" onClick={this.logout} />
                </h1>
              </div>
              <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/chat'>Chat</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
              </ul>
            </header>
            <div className="container">
              <Switch>
                <Route exact path="/login" render={
                  props => (
                    <Login hubConnection={this.state.hubConnection} />
                  )} />
                <Route exact path="/" component={FilterList} />
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
      </Router>
    );
  }
}

export default App;
