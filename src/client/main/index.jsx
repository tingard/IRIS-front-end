import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientAPI from 'grapheel-iris-client-api';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SignUpPage from './components/sign-up';
import ForgotPassword from './forgot-password';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.state = {
      isLoggedIn: false,
      user: {
        type: false,
      },
    };
    this.api = new ClientAPI();
  }
  componentDidMount() {
    console.log('main app mounted 2');
    this.api.init()
      .then(
        (result) => {
          if (result.isLoggedIn) {
            this.setState({
              isLoggedIn: this.api.state.isLoggedIn,
              user: this.api.state.user,
            });
          }
        },
      );
  }
  onLogin(utype, email, password) {
    return this.api.login(utype, email, password).then(
      (result) => {
        if (result.success) {
          this.setState({
            isLoggedIn: this.api.state.isLoggedIn,
            user: this.api.state.user,
          });
        }
        return result;
      },
    );
  }
  render() {
    console.log(this.api);
    return (
      <Router>
        <Fragment>
          <Route
            path="/login"
            render={
            (props) => {
              if (this.state.isLoggedIn && this.state.user.type) {
                window.location.replace(`/${this.state.user.type}`);
                return <span />;
              }
              return <LoginPage {...props} onLogin={this.onLogin} />;
            }
          }
          />
          <Route
            exact
            path="/"
            component={HomePage}
          />
          <Route
            path="/create/:utype?"
            render={p => <SignUpPage api={this.api} {...p} />}
          />
          <Route
            path="/forgotten/:id?"
            render={p => <ForgotPassword api={this.api} {...p} />}
          />
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(
  <MainApp />
  , document.querySelector('.app'),
);
