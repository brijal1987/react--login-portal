import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers';

import { userActions } from '../actions';
import { userService } from '../services/user.service';

export class LoginPage extends Component {
    constructor(props) {
        super(props);

        // reset login status

        this.state = {
            username: '',
            password: '',
            submitted: false,
            message :'',
            messagetype :'',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let state = localStorage["appState"];
        if (state) {
          let AppState = JSON.parse(state);
          this.setState({ message: AppState.message, messagetype: 'success' });
        }
        setTimeout(this.setState({ isLoading: false }), 1000);
        setTimeout(() => this.setState({message:''}), 3000);

    }

    handleChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(e) {
        const {username, password} = this.state;
        e.preventDefault();
        var result = await userActions.login(username, password);
        if(result.success){

            let appState = {
                isLoggedIn: true,
            };
            // save app state with user date in local storage
            localStorage["appState"] = JSON.stringify(appState);
            window.location.href = `${window.location.pathname}/`;
        } else {
            this.setState({
                message: `Error: ${result.err}`,
            });
            this.setState({
                messagetype: 'error',
            });
            setTimeout(() => this.setState({message:''}), 3000);

        }
    }

    render() {
        const { username, password, submitted, message, messagetype } = this.state;
        // if(redirect){
        //     return <Redirect to='/' />
        // }
        return (
            <div>
            {message && messagetype === 'error' && <div className="alert alert-danger">{message}</div>}
            {message && messagetype === 'success' && <div className="alert alert-success">{message}</div>}
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2> 
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" onChange={this.handleChange}/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Login</button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state) {

}

export { LoginPage as TestLoginPage };
