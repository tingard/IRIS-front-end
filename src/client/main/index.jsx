import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader/root';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientAPI from 'grapheel-iris-client-api';
import '../common-resources/_IrisBase.scss';
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
            render={
              (p) => {
                if (this.state.isLoggedIn && this.state.user.type) {
                  window.location.replace(`/${this.state.user.type}`);
                  return <span />;
                }
                return <SignUpPage api={this.api} {...p} />;
              }
            }
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

const MainAppHot = hot(MainApp);

ReactDOM.render(
  <MainAppHot />,
  document.querySelector('.app'),
);
