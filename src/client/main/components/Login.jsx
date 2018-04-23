import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Login = props => (
  <div className="login-option login" key="login-page">
    <h1>{`${props.title} Login`}</h1>
    <input type="email" className="grapheel-input" placeholder="email address" />
    <input type="password" className="grapheel-input" placeholder="password" />
    <button className="iris-button primary">
      Login
    </button>
    <Link to={`/create/${props.type}`}>Create an account</Link>
  </div>
);

Login.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Login;
