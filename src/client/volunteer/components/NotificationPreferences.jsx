import React from 'react';
import PropTypes from 'prop-types';
import IrisSelect from '../../common-resources/IrisSelect';

class NotificationPreferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.email,
      browser: props.browser,
      level: props.level,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      email: nextProps.email,
      browser: nextProps.browser,
      level: nextProps.level,
    });
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
                () => this.props.onChange(this.state),
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
                () => this.props.onChange(this.state),
              )}
            />
            <span className="iris-checkbox-checkmark" />
          </label>
        </div>
        <IrisSelect
          id="volunteer-notification-level-select"
          label="When should we notify you that students need help?"
          options={[
            { value: '0', text: 'Not at all' },
            { value: '1', text: 'Daily' },
            { value: '2', text: 'Immediatey' },
          ]}
          value={this.state.level.toString()}
          onChange={level => this.setState(
            { level },
            () => this.props.onChange(this.state),
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
  level: '0',
};

export default NotificationPreferences;
