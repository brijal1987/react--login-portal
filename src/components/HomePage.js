import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { logoutUser} = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                    <Link to="" onClick={logoutUser}>Logout</Link>
                </p>
            </div>
        );
    }
}
