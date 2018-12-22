/* eslint no-bitwise: ["error", { "allow": ["&"] }] */
import React from 'react';
import PropTypes from 'prop-types';
import IrisSelect from '../../common-resources/IrisSelect';
import '../../common-resources/_IrisCheckbox.scss';

class NotificationPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      browser: props.browser,
      messages: props.level & 1,
      newImage: (props.level & 2) / 2,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      email: nextProps.email,
      browser: nextProps.browser,
      messages: nextProps.level & 1,
      newImage: (nextProps.level & 2) / 2,
    });
  }

  bundleReturn(state) {
    return {
      email: state.email,
      browser: state.browser,
      level: parseInt(state.newImage * 2, 10) + parseInt(state.messages, 10),
    };
  }

  render() {
    return (
      <section>
        <h3>Notifications</h3>
        <div className="w3-padding-16">
          <label
            htmlFor="profile-page-email-notifications"
            className="iris-checkbox-container"
          >
            Email Notifications
            <input
              type="checkbox"
              className="no-mouseflow"
              id="profile-page-email-notifications"
              checked={this.state.email}
              onChange={e => this.setState(
                { email: e.target.checked },
                () => this.props.onChange(
                  this.bundleReturn(this.state),
                ),
              )}
            />
            <span className="iris-checkbox-checkmark" />
          </label>
        </div>
        <div className="w3-padding-16">
          <label
            htmlFor="profile-page-browser-notifcations"
            className="iris-checkbox-container"
          >
            Browser Notifications
            <input
              type="checkbox"
              className="no-mouseflow"
              id="profile-page-browser-notifcations"
              checked={this.state.browser}
              onChange={e => this.setState(
                { browser: e.target.checked },
                () => this.props.onChange(
                  this.bundleReturn(this.state),
                ),
              )}
            />
            <span className="iris-checkbox-checkmark" />
          </label>
        </div>
        <IrisSelect
          id="volunteer-notification-level-select"
          label="Should we notify you when you have a new message?"
          options={[
            { value: '0', text: 'Never' },
            { value: '1', text: 'Immediatey' },
          ]}
          value={(this.state.messages).toString()}
          onChange={messages => this.setState(
            { messages },
            () => this.props.onChange(
              this.bundleReturn(this.state),
            ),
          )}
        />
        <IrisSelect
          id="volunteer-notification-level-select"
          label="Should we notify you when a student needs help?"
          options={[
            { value: '0', text: 'Not at all' },
            { value: '1', text: 'Immediatey' },
          ]}
          value={this.state.newImage.toString()}
          onChange={newImage => this.setState(
            { newImage },
            () => this.props.onChange(
              this.bundleReturn(this.state),
            ),
          )}
        />
      </section>
    );
  }
}

NotificationPreferences.propTypes = {
  email: PropTypes.bool.isRequired,
  browser: PropTypes.bool.isRequired,
  level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
};

NotificationPreferences.defaulProps = {
  level: '3',
};

export default NotificationPreferences;
