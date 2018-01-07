import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ClientAPI from 'grapheel-iris-client-api';
import { store as volunteerStore, App as VolunteerApp } from './volunteer';
import { store as studentStore, App as StudentApp } from './student';

const volunteerAppWrapper = () => (
  <Provider store={volunteerStore}>
    <HashRouter>
      <VolunteerApp />
    </HashRouter>
  </Provider>
);

const studentAppWrapper = () => (
  <Provider store={studentStore}>
    <HashRouter>
      <StudentApp />
    </HashRouter>
  </Provider>
);

class IRISApp extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.api = new ClientAPI();
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }
  componentDidMount() {
    this.api.init().then(
      (s2) => {
        if (s2.isLoggedIn) {
          this.setState({
            isLoggedIn: this.api.state.isLoggedIn,
            user: this.api.state.user,
          });
        }
      },
    );
  }
  login() {
    this.api.login(this.utypeSelect.value, this.emailInput.value, this.passwordInput.value).then(
      (r) => {
        this.passwordInput.value = '';
        if (r.success) {
          this.setState({
            isLoggedIn: this.api.state.isLoggedIn,
            user: this.api.state.user,
          });
        } else {
          alert('Could not login');
        }
      },
    );
  }
  render() {
    if (this.state.isLoggedIn && this.state.user.type) {
      return (
        this.state.user.type === 'volunteer' ?
          volunteerAppWrapper() :
          studentAppWrapper()
      );
    }
    // TODO: replace this with a dedicated login page, for ease of testing.
    return (
      <div className="w3-container">
        <div className="w3-panel">
          <h1>
            Welcome to the IRIS web App 😄
          </h1>
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
          className="w3-input"
          type="email"
        />
        <label htmlFor="login-password-input">Password</label>
        <input
          id="login-password-input"
          ref={(r) => { this.passwordInput = r; }}
          className="w3-input" type="password"
        />
        <button className="w3-button" onClick={this.login}>Login</button>
      </div>
    );
  }
}
ReactDOM.render(
  <IRISApp />
  , document.querySelector('.app'),
);
