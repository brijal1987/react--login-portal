import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers';

import { userActions } from '../actions';

export class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: ''
            },
            submitted: false,
            message: '',
            messagetype: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        // handle input change and dispatch register
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let { user } = this.state;
        if(name === 'username'){

            this.setState({
                user: {
                    ...user,
                    username: value
                }
            });
        } else{
            this.setState({
                user: {
                    ...user,
                    password: value
                }
            });
        }

        // if(name === 'username')
        //     this.setState({...this.state.user, 'username': value});
        // if(name === 'password')
        //     this.setState({...this.state.user, 'password': value});
    }

    async handleSubmit(event) {
        // handle button click and dispatch register
        const { user } = this.state;
        event.preventDefault();
        var result = await userActions.register(user);
        if(result.success){
            let appState = {
                message: "Registration Successful.",
            };
            // save app state with user date in local storage
            localStorage["appState"] = JSON.stringify(appState);
            // userActions.success(result.data);
            window.location.href = `${window.location.pathname}/login`;
        } else {
            // userActions.failure(result.err);
            this.setState({
                message: `Error: ${result.err}`,
            });
            this.setState({
                messagetype: 'error',
            });
        }
    }

    render() {
        const { user, submitted, message, messagetype } = this.state;
        return (
            <div>
            {message && messagetype === 'error' && <div className="alert alert-danger">{message}</div>}
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username"  onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Register</button>
                        <Link to="/login" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

// complete the below function
function mapStateToProps(state) {
    
}

export { RegisterPage as TestRegisterPage };
