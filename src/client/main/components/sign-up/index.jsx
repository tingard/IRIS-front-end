import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import UtypeSelect from './UtypeSelect';
import AboutVolunteer from './AboutVolunteer';
import AboutStudent from './AboutStudent';

class SignUpPage extends React.Component {
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
            alt="IRIS\'s logo, a rainbow coloured eye pupil with a greek gamma overlaid on it'"
            width="80px"
          />
          Sign up to IRIS
        </h1>
        <Switch>
          <Route exact path="/create" component={UtypeSelect} />
          <Route
            exact
            path="/create/volunteer"
            render={p => <AboutVolunteer onComplete={this.onComplete} {...p} />}
          />
          <Route
            exact
            path="/create/student"
            render={p => <AboutStudent onComplete={this.onComplete} {...p} />}
          />
          <Route path="/" render={() => <p>Not found</p>} />
        </Switch>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  api: PropTypes.object.isRequired,
};

export default SignUpPage;
