import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Login from './Login';
import SelectPage from './SelectPage';
import '../styles/login.scss';

const LoginPage = props => (
  <div id="login-root">
    <Route
      exact
      path="/login/student"
      render={p => (
        <Login
          type="student"
          title="Student"
          onLogin={props.onLogin}
          {...p}
        />
      )}
    />
    <Route
      exact
      path="/login/volunteer"
      render={p => (
        <Login
          type="volunteer"
          title="Volunteer"
          onLogin={props.onLogin}
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
          onLogin={props.onLogin}
          {...p}
        />
      )}
    />
    <Route
      exact
      path="/login"
      render={p => (
        <SelectPage {...p} />
      )}
    />
  </div>
);

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
