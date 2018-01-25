import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ClientAPI from 'grapheel-iris-client-api';
import Login from './Login';
import SignUp from './sign-up';
import VolunteerApp from './volunteer';
import StudentApp from './student';

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
          <Route exact path="/" render={p => <Login api={this.api} login={this.login} {...p} />} />;
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
