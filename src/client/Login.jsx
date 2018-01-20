import React from 'react';
import PropTypes from 'prop-types';
import ClientAPI from 'grapheel-iris-client-api';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.api = new ClientAPI();
    this.state = {
      isLoggedIn: false,
      user: {},
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
        <div className="w3-panel">
          <h1>
            Welcome to IRIS 😄
          </h1>
        </div>
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
        <label htmlFor="login-utype-select">I am a</label>
        <select
          id="login-utype-select"
          className="w3-input"
          ref={(r) => { this.utypeSelect = r; }}
        >
          <option value="volunteer">Sighted volunteer</option>
          <option value="student">VIP Student</option>
        </select>
        <label htmlFor="login-email-input">Email</label>
        <input
          id="login-email-input"
          ref={(r) => { this.emailInput = r; }}
          className={`w3-input ${this.state.didFailLogin ? 'w3-border-red' : ''}`}
          type="email"
        />
        <label htmlFor="login-password-input">
          Password
        </label>
        <input
          id="login-password-input"
          ref={(r) => { this.passwordInput = r; }}
          className={`w3-input ${this.state.didFailLogin ? 'w3-border-red' : ''}`} type="password"
        />
        <button className="w3-button w3-border w3-margin-top" onClick={this.login}>Login</button>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
};

export default Login;
