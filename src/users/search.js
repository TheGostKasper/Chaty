import React, { Component } from 'react';
import { services } from './../services/chaty-service';
import UserList from './listItems'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            users: []
        };
    }
    componentWillMount = () => {
        services.searchUsers(this.state.page, "")
            .then(res => {
                console.log(res)
                this.setState({
                    users: res.data
                });
            })
            .catch(err => console.log(err));
    }
    searchUser = (e) => {
        const search = e.target.value;

        // if (search.length > 3)
        services.searchUsers(this.state.page, search)
            .then(res => {
                this.setState({
                    users: res.data
                });
            })
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div className="search-group">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search for..." onChange={this.searchUser} />
                    <span className="input-group-btn">
                        <button className="btn btn-default z-index-0" type="button">Go!</button>
                    </span>
                </div>
                <div className="users">
                    <UserList hubConnection={this.props.hubConnection} users={this.state.users} />
                </div>
            </div>

        )
    }
}

export default Search;