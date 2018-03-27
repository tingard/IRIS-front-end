import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import ClientAPI from 'grapheel-iris-client-api';
import Login from './Login';
import ForgotPassword from './forgot-password';
import ConfirmEmailPage from './commonResources/ConfirmEmailPage';
import SignUp from './sign-up';
import VolunteerApp from './volunteer';
import StudentApp from './student';

class IRISApp extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.confirmEmail = this.confirmEmail.bind(this);
    this.api = new ClientAPI();
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }
  componentDidMount() {
    this.api.init().then(
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
  login(utype, email, password) {
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
  confirmEmail(id) {
    return this.api.handle({ name: 'CONFIRM_EMAIL' }, id)
      .then(r => ({ res: { success: r.success } }));
  }
  render() {
    let innerComponent;
    if (this.state.isLoggedIn && this.state.user.type) {
      innerComponent = (
        <HashRouter>
          {
            this.state.user.type === 'volunteer' ?
              <VolunteerApp /> :
              <StudentApp />
          }
        </HashRouter>
      );
    } else {
      innerComponent = (
        <Switch>
          <Route path="/sign-up" render={p => <SignUp api={this.api} {...p} />} />;
          <Route exact path="/" render={p => <Login api={this.api} login={this.login} {...p} />} />
          <Route
            exact
            path="/forgotten"
            render={p => <ForgotPassword api={this.api} {...p} />}
          />
          <Route
            exact
            path="/forgotten/:id"
            render={p => <ForgotPassword api={this.api} {...p} />}
          />
          <Route
            exact
            path="/confirm/:id"
            render={p => (
              <ConfirmEmailPage
                confirmEmail={this.confirmEmail}
                {...p}
              />
            )}
          />
          <Route render={() => <Redirect to="/" />} />} />
        </Switch>
      );
    }
    return (
      <HashRouter>
        {innerComponent}
      </HashRouter>
    );
  }
}
ReactDOM.render(
  <IRISApp />
  , document.querySelector('.app'),
);
