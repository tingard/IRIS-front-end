import React from 'react';
import PropTypes from 'prop-types';
import ClientAPI from 'grapheel-iris-client-api';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.api = new ClientAPI();
    this.state = {
      // isLoggedIn: false,
      // user: {},
      didFailLogin: false,
    };
  }
  login() {
    this.setState({ didFailLogin: false });
    this.props.login(
      this.utypeSelect.value,
      this.emailInput.value,
      this.passwordInput.value,
    ).then(() => {
      this.passwordInput.value = '';
      this.setState({ didFailLogin: true });
    });
  }
  render() {
    return (
      <div className="w3-container">
        <section role="group" aria-labelledby="login-section-header">
          <h1 id="login-section-header">Login to IRIS</h1>
          <div role="status">
            {this.state.didFailLogin ?
              <div
                className={'w3-panel w3-border w3-round ' +
                  'w3-border-red w3-animate-right w3-display-container'}
                aria-describedby="invalid-login-alert"
              >
                <p id="invalid-login-alert">Invalid username or password</p>
                <button
                  className="w3-display-topright w3-button"
                  onClick={() => this.setState({ didFailLogin: false })}
                  aria-label="Close"
                >
                  x
                </button>
              </div> : null
            }
          </div>
          <div className="w3-row w3-margin-bottom">
            <label htmlFor="login-utype-select">
              I am a
              <select
                id="login-utype-select"
                className="w3-input select-style"
                ref={(r) => { this.utypeSelect = r; }}
              >
                <option value="volunteer">Sighted volunteer</option>
                <option value="student">VIP Student</option>
              </select>
            </label>
          </div>
          <div className="w3-row">
            <label htmlFor="login-email-input">
              Email
              <input
                id="login-email-input"
                ref={(r) => { this.emailInput = r; }}
                className={`w3-input ${this.state.didFailLogin ? 'w3-border-red' : ''}`}
                type="email"
              />
            </label>
          </div>
          <div className="w3-row">
            <label htmlFor="login-password-input">
              Password
              <input
                id="login-password-input"
                ref={(r) => { this.passwordInput = r; }}
                className={`w3-input ${this.state.didFailLogin ? 'w3-border-red' : ''}`}
                type="password"
              />
            </label>
          </div>
          <button className="w3-button w3-border w3-margin-top" onClick={this.login}>Login</button>
        </section>
        <section role="group" aria-labelledby="sign-up-section-header">
          <h1 id="sign-up-section-header">Sign up to IRIS</h1>
          Don't have an account? <Link to="/sign-up">Sign up to IRIS</Link>
        </section>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
};

export default Login;
