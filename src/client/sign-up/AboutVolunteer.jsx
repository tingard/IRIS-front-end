/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import IrisButton from '../common-resources/IrisButton';

const wrapQuestion = (q, htmlFor) => (
  <MediaQuery minWidth={601}>
    {(matches) => {
      if (matches) {
        return (
          <div className="w3-half w3-right-align">
            <label htmlFor={htmlFor} className="w3-margin-right sign-up-question">
              {q}
            </label>
          </div>
        );
      }
      return (
        <div className="w3-half w3-left-align">
          <label htmlFor={htmlFor} className="w3-margin-right">
            {q}
          </label>
        </div>
      );
    }}
  </MediaQuery>
);

class AboutVolunteer extends React.Component {
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
      utype: 'volunteer',
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
    const levelOptions = [
      { value: '0', text: 'Not at all' },
      { value: '1', text: 'GCSE level' },
      { value: '2', text: 'A-level' },
      { value: '3', text: 'Degree level' },
    ];
    return (
      <div
        className="w3-row-padding w3-animate-opacity"
        style={{ zIndex: 1, backgroundColor: 'white' }}
      >
        <h3 className="w3-padding-16 w3-margin-bottom" style={{ maxWidth: '80vw', margin: 'auto' }}>
          Great! We're always looking for more volunteers to help out students.
          Could you answer a few questions about yourself for us?
        </h3>
        <div className="w3-row" role="group" aria-label="Tell us your name">
          {wrapQuestion('What\'s your name?', 'name-input')}
          <div className="w3-half">
            <input
              id="name-input"
              placeholder="Albert Einstein"
              className="w3-input w3-border w3-round"
              ref={(r) => { this.nameInput = r; }}
              aria-label="Type your name here"
              onChange={this.checkFields}
            />
          </div>
        </div>
        <div
          className="w3-row w3-padding-16"
          role="group"
          aria-label="What is your email address"
        >
          {wrapQuestion('And your email address?', 'email-input')}
          <div className="w3-half">
            <input
              id="email-input"
              type="email"
              placeholder="You'll use this to login"
              className={`w3-input w3-border ${this.state.isValidEmail ? '' : 'w3-border-red'} w3-round`}
              ref={(r) => { this.emailInput = r; }}
              onChange={this.validateEmail}
            />
          </div>
        </div>
        <div
          className="w3-row w3-padding-16"
          role="group"
          aria-label="Which subjects can you help with?"
        >
          {wrapQuestion('What subjects would you like to help with?', '')}
          <div className="w3-half" style={{ paddingTop: '10px' }}>
            {['physics', 'biology', 'chemistry', 'maths', 'Computer Science'].map(
              s => (
                <div className="w3-row w3-margin-bottom" key={`select-${s}`}>
                  <label htmlFor={`${s}-level-select`} className="w3-margin-right">
                    {`${s.charAt(0).toUpperCase()}${s.slice(1)}`}
                  </label>
                  <select id={`${s}-level-select`} className="select-style" ref={(r) => { this.selects[s] = r; }}>
                    {levelOptions.map(
                      l => <option value={l.value} key={`select-${s}-${l.value}`}>{l.text}</option>,
                    )}
                  </select>
                </div>
              ),
            )}
          </div>
        </div>
        <div
          className="w3-row w3-padding-16"
          role="group"
          aria-label="Set a password"
        >
          {wrapQuestion('Lastly, set a password:', 'passwordInput')}
          <div className="w3-half">
            <input
              id="password-input"
              type="password"
              placeholder="Type a password"
              className="w3-input w3-border w3-round"
              ref={(r) => { this.passwordInput = r; }}
              onChange={this.checkFields}
              onKeyPress={e => (e.key === 'Enter' ? this.registerUser() : null)}
            />
          </div>
        </div>
        <div className="w3-row">
          <IrisButton
            disabled={!this.state.allFieldsDone}
            onClick={this.registerUser}
            className="w3-margin-top w3-bar"
            text="Sign up to IRIS!"
          />
        </div>
        <div className="w3-row w3-padding-16">
          <Link to="/sign-up">Go Back</Link>
        </div>
      </div>
    );
  }
}

AboutVolunteer.propTypes = {
  onComplete: PropTypes.func,
};

export default AboutVolunteer;
