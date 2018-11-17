/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import IrisButton from '../../../common-resources/IrisButton';
import IrisSelect from '../../../common-resources/IrisSelect';

const availableSubjects = [
  { value: 'physics', text: 'Physics' },
  { value: 'maths', text: 'Maths' },
  { value: 'biology', text: 'Biology' },
  { value: 'chemistry', text: 'Chemistry' },
  { value: 'computerScience', text: 'Computer Science' },
  { value: 'psychology', text: 'Psychology' },
  { value: 'finance', text: 'Finance' },
];

const levelOptions = [
  { value: '0', text: 'Not at all' },
  { value: '1', text: 'GCSE level' },
  { value: '2', text: 'A-level' },
  { value: '3', text: 'Degree level' },
];

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
      levels: {},
    };
    availableSubjects.forEach(({ value }) => {
      this.state.levels[value] = '0';
    });
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
      levels: this.state.levels,
    };
    this.props.onComplete(payload);
  }
  render() {
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
              className="grapheel-input"
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
              className={`grapheel-input ${this.state.isValidEmail ? '' : 'invalid'}`}
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
            {availableSubjects.map(
              ({ value, text }) => (
                <div className="w3-row" key={`select-${value}`}>
                  <IrisSelect
                    id={`volunteer-${value}-level-select`}
                    options={levelOptions}
                    label={text}
                    value={this.state.levels[value]}
                    onChange={e => this.setState(
                      { levels: Object.assign({}, this.state.levels, { [value]: e }) },
                    )}
                  />
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
              className="grapheel-input"
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
          <Link to="/create">Go Back</Link>
        </div>
      </div>
    );
  }
}

AboutVolunteer.propTypes = {
  onComplete: PropTypes.func,
};

export default AboutVolunteer;
