import React from 'react';
import { Switch, Route } from 'react-router-dom';// , Router
// import { connect } from 'react-redux';
// import { PrivateRoute } from './PrivateRoute.js';
import { history } from './helpers';
// import { alertActions } from './actions';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          isLoggedIn: false,
          isLoading: false,
        };
      }

      componentDidMount() {
        this.setState({ isLoading: true })
        let state = localStorage["appState"];
        console.log("state", state);
        if (state) {
          let AppState = JSON.parse(state);
          this.setState({ isLoggedIn: AppState.isLoggedIn });
        }
        setTimeout(this.setState({ isLoading: false }), 1000);
    }

    _logoutUser = () => {
      let appState = {
        isLoggedIn: false,
      };
      // save app state with user date in local storage
      localStorage["appState"] = JSON.stringify(appState);
      this.setState(appState);
    };

    render() {
        if (
            !this.state.isLoggedIn &&
            this.props.location.pathname !== "/login" &&
            this.props.location.pathname !== "/register"
          ) {
            console.log(
              "you are not loggedin and are not visiting login or register, so go to login page"
            );
            this.props.history.push("/login");
          }
          if (
            this.state.isLoggedIn &&
            (this.props.location.pathname === "/login" ||
              this.props.location.pathname === "/register")
          ) {
            console.log(
              "you are either going to login or register but youre logged in"
            );

            this.props.history.push("/");
          }
          const { isLoading } = this.state;

          return (
            <div>
            {!isLoading ?
            <Switch data="data">
              <div className="container">
                  <div className="col-sm-8 col-sm-offset-2">
                    <Route exact
                        path="/"
                        render={props => <HomePage logoutUser={this._logoutUser} />}
                        />

                    <Route exact
                        path="/login"
                        render={props => <LoginPage {...this.props} />}
                        />

                    <Route exact
                        path="/register"
                        render={props => (
                            <RegisterPage />
                        )}
                        />
                  </div>
              </div>
            </Switch>
            : <h3>Loading...</h3>
          }
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}