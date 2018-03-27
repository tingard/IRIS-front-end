import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
// import Select from 'react-select';
import moment from 'moment';
import FullPageSpinner from './FullPageSpinner';
import IrisButton from '../../commonResources/IrisButton';


const isValidEmail = v => /\S+@\S+\.\S+/.test(v) || v === '';

const subjects = [
  ['physics', 'Physics'],
  ['biology', 'Biology'],
  ['chemistry', 'Chemistry'],
  ['maths', 'Maths'],
  ['computerScience', 'Computer Science'],
  ['psychology', 'Psychology'],
  ['finance', 'Finance'],
];
const level = [
  { value: '0', label: 'None' },
  { value: '1', label: 'GCSE level' },
  { value: '2', label: 'A-level' },
  { value: '3', label: 'Degree level' },
];

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.getDefaultLevelSelect = this.getDefaultLevelSelect.bind(this);
    this.update = this.update.bind(this);
    this.saveProfile = this.saveProfile.bind(this);
    this.state = {
      name: this.props.user.get('name'),
      email: this.props.user.get('email'),
      bio: this.props.user.get('bio') || '',
      emailIsValid: isValidEmail(this.props.user.get('email')),
      notificationPrefs: {
        email: this.props.user.get('emailNotifications') || false,
        browser: this.props.user.get('browserNotifications') || false,
      },
    };
  }
  getDefaultLevelSelect(s) {
    console.log(this.props.user.get('levels').get(s[0]).toString());
    if (this.props.user.get('levels').get(s[0])) {
      return this.props.user.get('levels').get(s[0]).toString();
    }
    return '0';
  }
  update() {
    console.log('updating');
    // called on input box change to update values properly
    this.setState({
      email: this.emailInput.value,
      emailIsValid: isValidEmail(this.emailInput.value),
      bio: this.bioInput.value,
      notificationPrefs: {
        email: this.emailNotifications.checked,
        browser: this.browserNotifications.checked,
      },
    });
  }
  saveProfile() {
    if (this.state.emailIsValid) {
      this.props.setUserDetails({
        id: this.props.user.get('_id'),
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
    if (this.props.user.get('state').get('isFetching')) return <FullPageSpinner />;
    return (
      <div className="profile-page">
        <div className="w3-padding-16">
          <div className="w3-row w3-card-2">
            <div className="w3-panel">
              <p>
                IRIS is currently in a testing stage, and we value your feedback. Please email us
                at <a href="mailto:contact@grapheel.com">contact@grapheel.com</a> or use our GitHub
                issue tracker to leave comments, bug reports or feature suggestions!
              </p>
              <a
                href="https://github.com/grapheel/iris"
                rel="noopener noreferrer nofollow"
                target="_blank"
                className="iris-button action"
              >
                Go to issue tracker
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="w3-card-2 w3-container">
            <div className="w3-row">
              <div className="w3-col s4">
                <div style={{ padding: '10px', textAlign: 'center' }}>
                  <img
                    src="images/irisProposed_withoutBackground_small.png"
                    className="mf-disable"
                    alt="user badge"
                    width={100}
                  />
                </div>
              </div>
              <div className="w3-col s8">
                <h3 className="mf-disable">{this.state.name}</h3>
                <p>Active since <span className="mf-disable">{moment(this.props.user.get('creationDate')).fromNow()}</span></p>
                <p>Points: <span className="mf-disable">{this.props.user.get('points')}</span></p>
              </div>
            </div>
          </div>
          <div className="w3-padding-16">
            <label htmlFor="profile-page-email-input">
              Your email:
              <input
                id="profile-page-email-input"
                className={`no-mouseflow w3-input w3-border w3-round ${this.state.emailIsValid ? '' : 'invalid'}`}
                type="email"
                ref={(r) => { this.emailInput = r; }}
                value={this.state.email}
                onChange={this.update}
              />
            </label>
          </div>
          <div className="w3-padding-16">
            <label htmlFor="profile-page-bio-input">
              Tell us about you: (visible to students you message)
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
            <h3>User levels</h3>
            {subjects.map(s => (
              <label htmlFor={`profile-page-${s[0]}-level`} key={`profile-page-${s[0]}-level`}>
                <div className="w3-row">
                  <div className="w3-col s3">
                    <p style={{ textAlign: 'right', paddingRight: '5px' }}>{s[1]}:</p>
                  </div>
                  <div
                    className="w3-col s9"
                    style={{ paddingTop: '5px' }}
                    mf-data-replace={`${s[0]} level select`}
                  >
                    <select
                      id={`profile-page-${s[0]}-level`}
                      name={`profile-page-${s[0]}-level`}
                      className="w3-input w3-border select-style"
                      value={this.getDefaultLevelSelect(s)}
                      onChange={e => this.props.setUserDetails({
                        id: this.props.user.get('_id'),
                        details: { levels: { [`${s[0]}`]: parseInt(e.target.value, 10) } },
                      })}
                    >
                      {
                        level.map(
                          ({ value, label }) => (
                            <option value={value} key={`subjectInput-${value}`}>{label}</option>
                          ),
                        )
                      }
                    </select>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className="w3-padding-16">
            <label className="switch" htmlFor="profile-page-email-notifcations">
              <span>Email Notifications:</span>
              <input
                type="checkbox"
                className="grapheel-checkbox no-mouseflow"
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
                className="grapheel-checkbox no-mouseflow"
                id="profile-page-browser-notifications"
                ref={(r) => { this.browserNotifications = r; }}
                checked={this.state.notificationPrefs.browser}
                onChange={() => this.update()}
              />
            </label>
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
            <div
              className="w3-panel w3-border w3-round
                w3-border-green w3-animate-right w3-display-container"
              aria-describedby="profile-did-update-alert"
            >
              <p id="profile-did-update-alert">
                Succesfully updated profile!
              </p>
              <button
                className="w3-display-topright w3-button"
                onClick={this.props.dismissUpdateAlert}
                aria-label="Close"
              >
                x
              </button>
            </div>
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
    _id: PropTypes.string,
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
