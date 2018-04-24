import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      email: '',
      password: '',
    };
  }
  onLogin() {
    this.props.onLogin(
      this.props.type,
      this.state.email,
      this.state.password,
    )
      .then(
        r => console.log(r),
      );
  }
  render() {
    return (
      <div className="login-option login" key="login-page">
        <h1>{`${this.props.title} Login`}</h1>
        <input
          type="email"
          className="grapheel-input"
          placeholder="email address"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          type="password"
          className="grapheel-input"
          placeholder="password"
          onKeyPress={e => (e.key === 'Enter' ? this.onLogin() : null)}
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button
          className="iris-button primary"
          onClick={this.onLogin}
        >
          Login
        </button>
        <Link to={`/create/${this.props.type}`}>Create an account</Link>
      </div>
    );
  }
}

Login.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default Login;
