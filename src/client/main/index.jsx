import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ClientAPI from 'grapheel-iris-client-api';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

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
  }
  componentDidMount() {
    console.log('main app mounted 2');
    this.api = new ClientAPI();
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
            exact
            path="/create"
            render={p => (
              <div className="iris-narrow-page">
                <h1>Create an account</h1>
                <p>Choose a type!</p>
              </div>
            )}
          />
          <Route
            path="/create/:utype"
            render={p => (
              <div className="iris-narrow-page">
                <h1>
                  {['student', 'volunteer', 'licence-owner'].indexOf(p.match.params.utype) >= 0 ?
                    `Create a ${p.match.params.utype} account` : 'Create an account'}
                </h1>
                <p>this functionality isn't implemented yet</p>
              </div>
            )}
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
