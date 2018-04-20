import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../common-resources/IrisButton';
import IrisAlert from '../../common-resources/IrisAlert';

const isValidEmail = v => /\S+@\S+\.\S+/.test(v) || v === '';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.state = {
      name: props.name,
      email: props.email,
      bio: props.bio || '',
      emailIsValid: /\S+@\S+\.\S+/.test(props.email) && props.email !== '',
      notificationPrefs: {
        email: props.emailNotifications,
        browser: props.browserNotifications,
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      email: nextProps.email,
      bio: nextProps.bio || this.state.bio,
      emailIsValid: /\S+@\S+\.\S+/.test(nextProps.email) && nextProps.email !== '',
      notificationPrefs: {
        email: nextProps.emailNotifications,
        browser: nextProps.browserNotifications,
      },
    });
  }
  update() {
    this.setState({
      name: this.nameInput.value,
      email: this.emailInput.value,
      bio: this.bioInput.value,
      emailIsValid: isValidEmail(this.emailInput.value),
      notificationPrefs: {
        email: this.emailNotifications.checked,
        browser: this.browserNotifications.checked,
      },
    });
  }
  saveProfile() {
    this.props.setUserDetails({
      id: this.props._id,
      details: {
        name: this.state.name,
        email: this.state.email,
        bio: this.state.bio,
        emailNotifications: this.state.notificationPrefs.email,
        browserNotifications: this.state.notificationPrefs.browser,
      },
    });
  }
  render() {
    if (this.props.state.get('isFetching') && this.props.state.get('isStale')) {
      return <div>Connecting to the IRIS database...</div>;
    }
    return (
      <div className="w3-container w3-animate-opacity iris-narrow-page">
        <div className="w3-panel">
          <h1>Your Profile:</h1>
          <div className="w3-padding-16">
            <label htmlFor="profile-page-name-input">
              What should we call you? (Visible to volunteers)
              <input
                id="profile-page-name-input"
                className="w3-input w3-border w3-round"
                type="text"
                ref={(r) => { this.nameInput = r; }}
                value={this.state.name}
                onChange={() => this.update()}
              />
            </label>
          </div>
          <div className="w3-padding-16">
            <label htmlFor="profile-page-email-input">
              Your email:
              <input
                id="profile-page-email-input"
                className={`w3-input w3-border w3-round ${this.state.emailIsValid ? '' : 'invalid'}`}
                type="email"
                ref={(r) => { this.emailInput = r; }}
                value={this.state.email}
                onChange={() => this.update()}
              />
            </label>
          </div>
          <div className="w3-padding-16">
            <label htmlFor="profile-page-bio-input">
              Tell us about you: (visible to volunteers)
              <textarea
                id="profile-page-bio-input"
                ref={(r) => { this.bioInput = r; }}
                className="w3-border w3-round"
                rows={5}
                value={this.state.bio}
                placeholder="What do you study? Where?"
                onChange={() => this.update()}
              />
            </label>
          </div>
          <div className="w3-padding-16">
            <label className="switch" htmlFor="profile-page-email-notifcations">
              <span>Email Notifications:</span>
              <input
                type="checkbox"
                className="grapheel-checkbox"
                id="profile-page-email-notifications"
                ref={(r) => { this.emailNotifications = r; }}
                checked={this.state.notificationPrefs.email}
                onChange={() => this.update()}
              />
            </label>
          </div>
          <div className="w3-padding-16">
            <label className="switch" htmlFor="profile-page-browser-notifcations">
              <span>Browser Notifications:</span>
              <input
                type="checkbox"
                className="grapheel-checkbox"
                id="profile-page-browser-notifications"
                ref={(r) => { this.browserNotifications = r; }}
                checked={this.state.notificationPrefs.browser}
                onChange={() => this.update()}
              />
            </label>
          </div>
        </div>
        <IrisButton
          className="w3-bar"
          onClick={this.saveProfile}
          type="primary"
          text="Save Profile"
        />
        {this.props.state.get('updateDidSucceed') ? (
          <IrisAlert
            title="Profile has been saved"
            message="Your profile has been saved!"
            type="success"
            onClose={this.props.dismissUpdateAlert}
          />
        ) : null}
        <IrisButton
          className="w3-bar"
          onClick={this.props.logout}
          type="secondary"
          text="Logout"
        />
        <IrisButton
          className="w3-bar"
          onClick={() => null}
          disabled
          type="secondary"
          text="Change Password"
        />
        <IrisButton
          className="w3-bar"
          onClick={() => null}
          disabled
          type="delete"
          text="Delete account"
        />
        <div className="w3-row w3-padding-48" />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  _id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  bio: PropTypes.string,
  emailNotifications: PropTypes.bool,
  browserNotifications: PropTypes.bool,
  state: ImmutablePropTypes.contains({
    isFetching: PropTypes.bool,
    updateDidSucceed: PropTypes.bool,
  }),
  setUserDetails: PropTypes.func,
  dismissUpdateAlert: PropTypes.func,
  logout: PropTypes.func,
};

export default ProfilePage;
