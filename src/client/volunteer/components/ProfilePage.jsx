import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisLoader from '../../common-resources/IrisLoader';
import IrisButton from '../../common-resources/IrisButton';
import IrisAlert from '../../common-resources/IrisAlert';
import IssueTrackerPrompt from './IssueTrackerPrompt';
import AboutVolunteer from './AboutVolunteer';
import UserLevelsSelect from './UserLevelsSelect';
import NotificationPreferences from './NotificationPreferences';

const isValidEmail = v => /\S+@\S+\.\S+/.test(v) || v === '';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.getDefaultLevelSelect = this.getDefaultLevelSelect.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.state = {
      email: this.props.user.get('email'),
      bio: this.props.user.get('bio') || '',
      emailIsValid: isValidEmail(this.props.user.get('email')),
      notificationPrefs: {
        email: this.props.user.get('emailNotifications') || false,
        browser: this.props.user.get('browserNotifications') || false,
        level: this.props.user.get('notificationLevel') || 0,
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      email: nextProps.user.get('email'),
      bio: nextProps.user.get('bio') || '',
      emailIsValid: isValidEmail(nextProps.user.get('email')),
      notificationPrefs: {
        email: nextProps.user.get('emailNotifications') || false,
        browser: nextProps.user.get('browserNotifications') || false,
        level: nextProps.user.get('notificationLevel') || 0,
      },
    });
  }
  getDefaultLevelSelect(s) {
    if (this.props.user.get('levels').get(s[0])) {
      return this.props.user.get('levels').get(s[0]).toString();
    }
    return '0';
  }
  saveProfile() {
    if (this.state.emailIsValid) {
      this.props.setUserDetails({
        id: this.props.user.get('id'),
        details: {
          email: this.state.email,
          bio: this.state.bio,
          emailNotifications: this.state.notificationPrefs.email,
          browserNotifications: this.state.notificationPrefs.browser,
        },
      });
    } else {
      this.emailInput.scrollIntoView();
    }
  }
  render() {
    if (this.props.user.get('state').get('isFetching')) return <IrisLoader />;
    return (
      <div className="profile-page iris-narrow-page">
        <div className="w3-padding-16">
          <IssueTrackerPrompt />
        </div>
        <div className="row">
          <AboutVolunteer user={this.props.user} />
          <div className="w3-padding-16">
            <label htmlFor="profile-page-email-input">
              Your email:
              <input
                id="profile-page-email-input"
                className={`no-mouseflow w3-input w3-border w3-round ${this.state.emailIsValid ? '' : 'invalid'}`}
                type="email"
                value={this.state.email}
                onChange={({ target: { value } }) => this.setState({
                  email: value,
                  emailIsValid: isValidEmail(value),
                })}
                onBlur={({ target: { value } }) => (isValidEmail(value) ?
                  this.props.setUserDetails({
                    id: this.props.user.get('id'),
                    details: { email: value },
                  }) :
                  Promise.reject()
                )}
              />
            </label>
          </div>
          <div className="w3-padding-16">
            <label htmlFor="profile-page-bio-input">
              Tell us about you: (visible to students you message)
              <textarea
                id="profile-page-bio-input"
                className="w3-border w3-round"
                rows={5}
                value={this.state.bio}
                placeholder="What do you study? Where?"
                onChange={({ target: { value } }) => this.setState({ bio: value })}
                onBlur={({ target: { value } }) => this.props.setUserDetails({
                  id: this.props.user.get('id'),
                  details: { bio: value },
                })}
              />
            </label>
          </div>
          <div className="w3-padding-16">
            <UserLevelsSelect
              levels={this.props.user.get('levels').toObject()}
              onChange={(s, v) => this.props.setUserDetails({
                id: this.props.user.get('id'),
                details: { levels: { [`${s}`]: parseInt(v, 10) } },
              })}
            />
          </div>
          <div className="w3-padding-16">
            <NotificationPreferences
              {...this.state.notificationPrefs}
              onChange={notificationPrefs => this.setState(
                { notificationPrefs },
                () => this.props.setUserDetails({
                  id: this.props.user.get('id'),
                  details: {
                    emailNotifications: this.state.notificationPrefs.email,
                    browserNotifications: this.state.notificationPrefs.browser,
                    notificationLevel: this.state.notificationPrefs.level,
                  },
                }),
              )}
            />
          </div>
          <div className="w3-padding-16">
            <IrisButton
              className="w3-bar"
              onClick={this.saveProfile}
              type="primary"
              text="Save Profile"
            />
          </div>
          { this.props.user.get('state').get('updateDidSucceed') &&
            <IrisAlert
              title="Saved"
              message="Succesfully updated profile!"
              type="success"
              onClose={this.props.dismissUpdateAlert}
            />
          }
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
      </div>
    );
  }
}

ProfilePage.propTypes = {
  user: ImmutablePropTypes.contains({
    id: PropTypes.string,
    name: PropTypes.string,
    emailNotifications: PropTypes.bool,
    browserNotifications: PropTypes.bool,
    points: PropTypes.number,
    bio: PropTypes.string,
    level: ImmutablePropTypes.contains({
      physics: PropTypes.number,
      biology: PropTypes.number,
      chemistry: PropTypes.number,
      maths: PropTypes.number,
      computerScience: PropTypes.number,
    }),
    state: ImmutablePropTypes.contains({
      updateDidSucceed: PropTypes.bool,
    }),
  }),
  setUserDetails: PropTypes.func,
  dismissUpdateAlert: PropTypes.func,
  logout: PropTypes.func,
};
export default ProfilePage;
