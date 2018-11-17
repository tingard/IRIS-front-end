/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AboutLicenceOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidEmail: true,
      allFieldsDone: false,
    };
    this.selects = {};
    this.validateEmail = this.validateEmail.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }
  validateEmail() {
    const isValidEmail = /\S+@\S+\.\S+/.test(this.emailInput.value) || this.emailInput.value === '';
    this.setState({ isValidEmail }, this.checkFields);
  }
  checkFields() {
    const allFieldsDone = (
      this.passwordInput.value !== '' &&
      this.emailInput.value !== '' &&
      this.nameInput.value !== '' && this.state.isValidEmail
    );
    this.setState({ allFieldsDone });
  }
  registerUser() {
    const payload = {
      utype: 'licence-owner',
      email: this.emailInput.value,
      name: this.nameInput.value,
      pwd: this.passwordInput.value,
      levels: {},
    };
    Object.entries(this.selects).forEach(
      (i) => { payload.levels[i[0]] = i[1].value; },
    );
    this.props.onComplete(payload);
  }
  render() {
    return (
      <div
        className="w3-row-padding w3-animate-opacity"
        style={{ zIndex: 1, backgroundColor: 'white' }}
      >
        <h3 className="w3-padding-16 w3-margin-bottom" style={{ maxWidth: '80vw', margin: 'auto' }}>
          Thanks for your interest in IRIS!
        </h3>
        <div className="w3-row" role="group" aria-label="Tell us your name">
          <p>
            As we want to make sure to offer the best possible service to your
            students, we manually create Licence-owner accounts.
          </p>
          <p>
            Please email us at&nbsp;
            <a href="mailto:contact@grapheel.com">contact@grapheel.com</a>
            to express your interest, and a member of the team will get in contact
            as soon as possible!
          </p>
        </div>
        <div className="w3-row w3-padding-16">
          <Link to="/create">Go Back</Link>
        </div>
      </div>
    );
  }
}

AboutLicenceOwner.propTypes = {
  onComplete: PropTypes.func,
};

export default AboutLicenceOwner;
