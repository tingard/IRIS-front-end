import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import SelectPage from './SelectPage';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }
  /* eslint-disable class-methods-use-this */
  onLogin() {
    console.log('Login');
  }
  /* eslint-enable class-methods-use-this */
  render() {
    return (
      <div id="login-root">
        <Route
          exact
          path="/login/student"
          render={p => (<Login
            type="student"
            title="Student"
            onLogin={this.onLogin}
            {...p}
          />)}
        />
        <Route
          exact
          path="/login/volunteer"
          render={p => (
            <Login
              type="volunteer"
              title="Volunteer"
              onLogin={this.onLogin}
              {...p}
            />
          )}
        />
        <Route
          exact
          path="/login/licence-owner"
          render={p => (
            <Login
              type="licence-owner"
              title="Licence Manager"
              onLogin={this.onLogin}
              {...p}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <SelectPage {...props} />
        )}
        />
      </div>
    );
  }
}

export default LoginPage;
