import React from 'react';
import PropTypes from 'prop-types';
import LinkExpiredAlert from './link-expired-alert';
import SuccessfulResetLinkAlert from './successful-reset-link-alert';
import NotRegisteredUserAlert from './not-registered-user-alert';
import SuccessfulPasswordResetAlert from './successful-password-reset-alert';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      isNotRegitsteredUser: false,
      isValidEmail: true,
      invalidPassword: false,
      didSuccessfullyRequest: false,
      didSuccessfullySetPassword: false,
      isResetLink: props.match.params.id || false,
      linkHasExpired: false,
    };
  }
  setNewPassword() {
    if (this.passwordInput.value === '') {
      this.setState({ invalidPassword: true });
      console.log('invalid password');
      return;
    }
    this.props.api.setNewPassword({
      utype: this.utypeSelect.value,
      email: this.emailInput.value,
      pwd: this.passwordInput.value,
      resetLink: this.props.match.params.id,
    })
      .then((r) => {
        if (r.success) {
          this.setState({ didSuccessfullySetPassword: true, invalidPassword: false });
        }
      })
      .catch((e) => {
        switch (e.status) {
          case 'NO_USER_FOUND':
            this.setState({ isNotRegitsteredUser: true, invalidPassword: false });
            break;
          case 'INVALID_LINK':
            this.setState({ linkHasExpired: true, invalidPassword: false });
            break;
          default:
            console.warn('Tried to change password but API returned unknown error status');
        }
        return e;
      });
  }
  requestResetLink() {
    this.props.api.requestPasswordReset({
      utype: this.utypeSelect.value,
      email: this.emailInput.value,
    })
      .then((r) => {
        if (r.success) {
          this.setState({ didSuccessfullyRequest: true, isNotRegitsteredUser: false });
          this.emailInput.value = '';
        }
      })
      .catch((e) => {
        if (e.status === 'NO_USER_FOUND') {
          this.setState({ isNotRegitsteredUser: true });
          this.emailInput.value = '';
        }
      });
  }
  submit() {
    const isValidEmail = /\S+@\S+\.\S+/.test(this.emailInput.value);
    if (this.state.didSuccessfullyRequest || this.state.didSuccessfullySetPassword) {
      this.setState({
        didSuccessfullyRequest: false,
        didSuccessfullySetPassword: false,
      });
    }
    if (this.emailInput.value !== '' && isValidEmail) {
      this.setState({ isValidEmail: true });
      if (!this.state.isResetLink) this.requestResetLink();
      else this.setNewPassword();
    } else {
      this.setState({ isValidEmail: false });
    }
  }
  render() {
    return (
      <div className="w3-container" style={{ maxWidth: '1000px', margin: 'auto' }}>
        <div className="w3-padding-16" />
        <section role="group" aria-labelledby="resetPwd-section-header">
          <h1 id="resetPwd-section-header">
            { this.state.isResetLink ? 'Choose a new pasword' : 'Reset Password' }
          </h1>
          <div role="status">
            { this.state.linkHasExpired ? (
              <LinkExpiredAlert
                onClose={() => this.setState({ didSuccessfullyRequest: false })}
              />
            ) : null }
          </div>
          <div className="w3-row w3-margin-bottom">
            <label htmlFor="resetPwd-utype-select">
              I am a
              <select
                id="resetPwd-utype-select"
                className="w3-input select-style"
                ref={(r) => { this.utypeSelect = r; }}
                disabled={this.state.linkHasExpired}
              >
                <option value="volunteer">Sighted volunteer</option>
                <option value="student">VIP Student</option>
              </select>
            </label>
          </div>
          <div className="w3-row">
            <label htmlFor="resetPwd-email-input">
              {`${this.state.isResetLink ? 'Confirm ' : ''}Email`}
              <input
                id="resetPwd-email-input"
                type="email"
                className={`w3-input ${!this.state.isValidEmail ? 'w3-border-red' : ''}`}
                ref={(r) => { this.emailInput = r; }}
                disabled={this.state.linkHasExpired}
              />
            </label>
            <span role="status" className="w3-text-red">
              {!this.state.isValidEmail ? 'Please enter a valid email' : ''}
            </span>
          </div>
          { this.state.isResetLink ? (
            <div className="w3-row">
              <label htmlFor="resetPwd-password-input">
                {`${this.state.isResetLink ? 'Set new ' : ''}Password`}
                <input
                  id="resetPwd-password-input"
                  type="password"
                  className={`w3-input ${this.state.invalidPassword ? 'w3-border-red' : ''}`}
                  ref={(r) => { this.passwordInput = r; }}
                  disabled={this.state.linkHasExpired}
                />
                <span role="status" className="w3-text-red">
                  {this.state.invalidPassword ? 'Please enter a valid password' : ''}
                </span>
              </label>
            </div>
          ) : null }
          <button
            className="w3-button w3-border w3-margin-top"
            disabled={this.state.linkHasExpired}
            onClick={this.submit}
          >
            { this.state.isResetLink ? 'Set new pasword' : 'Send me a reset link' }
          </button>
          <div role="status">
            {this.state.isNotRegitsteredUser ?
              <NotRegisteredUserAlert
                onClose={() => this.setState({ isNotRegitsteredUser: false })}
              /> : null
            }
            <div role="status">
              {this.state.didSuccessfullyRequest ?
                <SuccessfulResetLinkAlert
                  onClose={() => this.setState({ didSuccessfullyRequest: false })}
                /> : null
              }
              {this.state.didSuccessfullySetPassword ?
                <SuccessfulPasswordResetAlert
                  onClose={() => this.setState({ didSuccessfullyRequest: false })}
                /> : null
              }
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  api: PropTypes.shape({
    requestPasswordReset: PropTypes.func,
    setNewPassword: PropTypes.func,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default ForgotPassword;
