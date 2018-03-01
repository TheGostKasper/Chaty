import React, { Component } from 'react';
import Input from './input';
import { cookies_services } from './services/cookies-service';
import { services } from './services/chaty-service';

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
                password: ''
            },
            active: true,
            activeLi: 'tab active',
            urlApi: 'http://localhost:56395/api',
            status: undefined
        }
    }
    componentWillMount = () => {
        if (cookies_services.getCookie('currUser'))
            window.location.href = '/';
    }
    componentDidMount = () => {
        this.setState({
            status: cookies_services.getCookie('currUser')
        })
    }
    setCookies = (res) => {
        if (res.token) {
            cookies_services.setCookies([{ name: 'currUser', value: JSON.stringify(res.data) },
            { name: 'token', value: JSON.stringify(res.token) }], 60)
            window.location.href = '/';
        }
        else alert(res.message);
    }
    signUp = (e) => {
        e.preventDefault();
        services.signUp(this.state.user)
            .then((res) => {
                this.setCookies(res);
            })
            .catch((err) => { console.log(err) });
    }
    logIn = (e) => {
        e.preventDefault();
        services.logIn(this.state.user)
            .then((res) => {
                this.setCookies(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    handler = (e) => {
        // e.preventDefault()
        this.setState({
            user: Object.assign(
                this.state.user,
                { [e.target.name]: e.target.value }
            )
        });
    }
    flip = (active, e) => {
        e.preventDefault();
        this.setState({
            active: (active === "signUp") ? true : false,
        });
    }
    render() {
        return (
            <div className="container">
                <div className="form">
                    <div className="tab-content">
                        <ul className="tab-group">
                            <li className={(this.state.active) ? "tab active" : "tab"}
                                onClick={this.flip.bind(this, "signUp")}><a href="#signup">Sign Up</a></li>
                            <li className={(!this.state.active) ? "tab active" : "tab"}
                                onClick={this.flip.bind(this, "login")}
                            ><a href="#login">Log In</a></li>
                        </ul>
                        {(this.state.active) ?
                            <div id="signup">
                                <h1 className="signup-h1">Sign Up for Free</h1>
                                <form className="form-horizontal" onSubmit={this.signUp.bind(this)}>
                                    <Input type="text" name="name" required={true} value={this.state.user.name} handler={this.handler} />
                                    <Input type="email" name="email" required={true} value={this.state.user.email} handler={this.handler} />
                                    <Input type="password" name="password" required={true} value={this.state.user.password} handler={this.handler} />
                                    <input type="submit" className="btn btn-chaty right" value="Sign Up" />
                                </form>
                            </div>
                            :
                            <div id="login">
                                <h1 className="signup-h1">Welcome Back!</h1>
                                <form onSubmit={this.logIn.bind(this)} className="form-horizontal">
                                    <Input type="email" name="email" required={true} value={this.state.user.email} handler={this.handler} />
                                    <Input type="password" name="password" required={false} value={this.state.user.password} handler={this.handler} />
                                    <input type="submit" className="btn btn-chaty right" value="Login" />

                                </form>
                            </div>
                        }


                    </div>

                </div >

                <div className={(this.state.status) ? 'show' : 'hide'}>
                    You are logged in , it's nice to have you here
            </div>
            </div >
        )
    }
}

export default LogIn;