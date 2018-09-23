import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IrisButton from '../../common-resources/IrisButton';
import IrisAlert from '../../common-resources/IrisAlert';
import IrisSelect from '../../common-resources/IrisSelect';

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
  componentWillReceiveProps(newProps) {
    if (this.state.isResetLink !== newProps.match.params.id || false) {
      if (this.passwordInput) {
        this.passwordInput.value = '';
      }
      this.setState({
        isNotRegitsteredUser: false,
        isValidEmail: true,
        invalidPassword: false,
        didSuccessfullyRequest: false,
        didSuccessfullySetPassword: false,
        isResetLink: newProps.match.params.id || false,
        linkHasExpired: false,
        userType: 'student',
      });
    }
  }
  setNewPassword() {
    if (this.passwordInput.value === '') {
      this.setState({ invalidPassword: true });
      console.log('invalid password');
      return;
    }
    this.props.api.setNewPassword({
      utype: this.state.userType,
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
      utype: this.state.userType,
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
              <IrisAlert
                title="Invalid password reset link!"
                text="Whoops, this link has expired or already been used!"
                onClose={() => this.setState({ linkHasExpired: false })}
              />
            ) : null }
          </div>
          <div className="w3-row w3-margin-bottom">
            <IrisSelect
              id="resetPwd-utype"
              label="I am a"
              options={[
                { value: 'volunteer', text: 'Sighted Volunteer' },
                { value: 'student1', text: 'VIP Student' },
              ]}
              value={this.state.userType}
              onChange={val => this.setState({ userType: val })}
            />
          </div>
          <div className="w3-row">
            <label htmlFor="resetPwd-email-input">
              {`${this.state.isResetLink ? 'Confirm ' : ''}Email`}
              <input
                id="resetPwd-email-input"
                type="email"
                className={`grapheel-input ${!this.state.isValidEmail ? 'w3-border-red' : ''}`}
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
                  className={`grapheel-input ${this.state.invalidPassword ? 'w3-border-red' : ''}`}
                  ref={(r) => { this.passwordInput = r; }}
                  disabled={this.state.linkHasExpired}
                />
                <span role="status" className="w3-text-red">
                  {this.state.invalidPassword ? 'Please enter a valid password' : ''}
                </span>
              </label>
            </div>
          ) : null }
          <div className="w3-row w3-margin-top">
            <IrisButton
              disabled={this.state.linkHasExpired}
              onClick={this.submit}
              type="primary"
              text={this.state.isResetLink ? 'Set new pasword' : 'Send me a reset link'}
            />
            <span className="w3-margin-left">
              <Link to="/">Go back to login</Link>
            </span>
          </div>
          <div role="status">
            {this.state.isNotRegitsteredUser ?
              <IrisAlert
                title="Invalid email"
                text="This email is not registered on IRIS for this user type"
                type="warning"
                onClose={() => this.setState({ isNotRegitsteredUser: false })}
              /> : null
            }
            <div role="status">
              {this.state.didSuccessfullyRequest ?
                <IrisAlert
                  title="Okay, check your email!"
                  text="Succesfully generated a password reset link, check your email!"
                  type="success"
                  onClose={() => this.setState({ didSuccessfullyRequest: false })}
                /> : null
              }
              {this.state.didSuccessfullySetPassword ?
                <IrisAlert
                  title="Success!"
                  message="Check your email for a reset link!"
                  type="success"
                  onClose={() => this.setState({ didSuccessfullySetPassword: false })}
                />
 : null
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
