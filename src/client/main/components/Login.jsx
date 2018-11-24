import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import validateEmail from '../../common-resources/validateEmail';
import IrisAlert from '../../common-resources/IrisAlert';
import '../styles/login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.state = {
      email: '',
      password: '',
      didFailLogin: false,
      emailIsInvalid: false,
      detailsAreInvalid: false,
    };
  }

  onLogin() {
    this.setState(
      { didFailLogin: false, emailIsInvalid: false, detailsAreInvalid: false },
      () => (
        validateEmail(this.state.email)
          ? this.sendLogin()
          : setTimeout(
            () => this.setState({
              didFailLogin: true,
              emailIsInvalid: true,
              password: '',
            }),
            200,
          )
      ),
    );
  }

  sendLogin() {
    this.props.onLogin(
      this.props.type,
      this.state.email,
      this.state.password,
    )
      .then(
        (r) => {
          if (!r.success) {
            this.setState({
              didFailLogin: true,
              detailsAreInvalid: true,
              password: '',
            });
          }
        },
      )
      .catch(
        e => console.log('caught login error', e),
      );
  }

  render() {
    return (
      <div
        className={`login-option login ${this.state.didFailLogin ? 'failed' : ''}`}
        key="login-page"
      >
        <h1>{`${this.props.title} Login`}</h1>
        {this.state.emailIsInvalid ? (
          <IrisAlert
            title="Invalid email address"
            message="Please enter a valid email"
            type="warning"
            onClose={() => this.setState({ didFailLogin: false, emailIsInvalid: false })}
          />
        ) : ''}
        {this.state.detailsAreInvalid ? (
          <IrisAlert
            title="Invalid details"
            message="Sorry, that username and password combination isn't right"
            type="warning"
            onClose={() => this.setState({ didFailLogin: false, detailsAreInvalid: false })}
          />
        ) : null}
        <input
          type="email"
          className={`iris-input ${this.state.didFailLogin ? 'invalid' : ''}`}
          placeholder="email address"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <input
          type="password"
          className={`iris-input ${this.state.didFailLogin ? 'invalid' : ''}`}
          placeholder="password"
          onKeyPress={e => (e.key === 'Enter' ? this.onLogin() : null)}
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <Link to="/forgotten">Forgotten password?</Link>
        <button
          className="iris-button primary"
          type="button"
          onClick={this.onLogin}
        >
          Login
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to={`/create/${this.props.type}`}>Create an account</Link>
          {' '}
          <Link to="/">IRIS home</Link>
        </div>
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
