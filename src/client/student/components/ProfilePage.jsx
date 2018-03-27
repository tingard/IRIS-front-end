import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../commonResources/IrisButton';

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
      shouldShowSavedProfileAlert: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log('Received props', this.state, nextProps);
  }
  update() {
    // called on input box change to update values properly
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
    this.setState({ shouldShowSavedProfileAlert: true });
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
      <div className="w3-container w3-animate-opacity">
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
        <div className="w3-padding-16">
          <IrisButton
            className="w3-bar"
            onClick={this.saveProfile}
            type="primary"
            text="Save Profile"
          />
        </div>
        {this.props.state.get('updateDidSucceed') ? (
          <div
            className="w3-panel w3-round w3-card-4 w3-display-container"
            role="group"
            aria-labelledby="upload-image-success-header"
            aria-atomic="true"
          >
            <h3 id="upload-image-success-header">Profile has been saved</h3>
            <p>Image has been successfully uploaded to IRIS</p>
            <button
              onClick={this.props.dismissUpdateAlert}
              className="w3-button w3-display-topright"
              aria-label="Close this message"
            >
              &times;
            </button>
          </div>
        ) : null}
        <div className="w3-padding-16">
          <IrisButton
            className="w3-bar"
            onClick={this.props.logout}
            type="secondary"
            text="Logout"
          />
        </div>
        <div className="w3-padding-16">
          <IrisButton
            className="w3-bar"
            onClick={() => null}
            disabled
            type="secondary"
            text="Change Password"
          />
        </div>
        <div className="w3-padding-16">
          <IrisButton
            className="w3-bar"
            onClick={() => null}
            disabled
            type="delete"
            text="Delete account"
          />
        </div>
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
  }),
  setUserDetails: PropTypes.func,
  dismissUpdateAlert: PropTypes.func,
  logout: PropTypes.func,
};

export default ProfilePage;
