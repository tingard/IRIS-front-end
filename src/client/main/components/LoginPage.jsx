import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            onLogin={this.props.onLogin}
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
              onLogin={this.props.onLogin}
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
              onLogin={this.props.onLogin}
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

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
