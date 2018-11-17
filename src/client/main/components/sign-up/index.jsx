import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import UtypeSelect from './UtypeSelect';
import VolunteerInformation from './VolunteerInformation';
import StudentInformation from './StudentInformation';
import LicenceOwnerInformation from './LicenceOwnerInformation';

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.api = props.api;
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
        <div className="w3-center w3-padding-16">
          <img
            src="/images/irisProposed_withoutBackground_100x100.png"
            alt="IRIS\'s logo, a rainbow coloured eye pupil with a greek gamma overlaid on it'"
            width="80px"
          />
        </div>
        <Switch>
          <Route exact path="/create" component={UtypeSelect} />
          <Route
            exact
            path="/create/volunteer"
            render={p => <VolunteerInformation onComplete={this.onComplete} {...p} />}
          />
          <Route
            exact
            path="/create/student"
            render={p => <StudentInformation onComplete={this.onComplete} {...p} />}
          />
          <Route path="/create/licence-owner" component={LicenceOwnerInformation} />
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
