import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import UtypeSelect from './UtypeSelect';
import AboutVolunteer from './AboutVolunteer';
import AboutStudent from './AboutStudent';

const irisAltText = 'IRIS\'s logo, a rainbow coloured eye pupil with a greek gamma overlaid on it';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.api = props.api;
    this.state = {
      selectedUsertype: 'student',
    };
    this.onComplete = this.onComplete.bind(this);
  }
  onComplete(payload) {
    this.api.registerUser(payload).then(
      (res) => { if (res.success) location.reload(); },
    );
  }
  render() {
    return (
      <div className="w3-container w3-display-container sign-up-sheet" style={{ minHeight: '100vh' }}>
        <h1 className="w3-center w3-padding-16">
          <img
            src="/images/irisProposed_withoutBackground_small.png"
            alt={irisAltText}
            width="80px"
          />
          Sign up to IRIS
        </h1>
        <Switch>
          <Route exact path="/sign-up" component={UtypeSelect} />
          <Route
            exact
            path="/sign-up/volunteer"
            render={p => <AboutVolunteer onComplete={this.onComplete} {...p} />}
          />
          <Route
            exact
            path="/sign-up/student"
            render={p => <AboutStudent onComplete={this.onComplete} {...p} />}
          />
        </Switch>
      </div>
    );
  }
}

Login.propTypes = {
  api: PropTypes.object,
};

export default Login;
