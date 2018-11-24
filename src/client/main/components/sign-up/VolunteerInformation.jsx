/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import IrisButton from '../../../common-resources/IrisButton';
import IrisLevelsSelect from '../../../common-resources/IrisLevelsSelect';
import validateEmail from '../../../common-resources/validateEmail';
import '../../../common-resources/_IrisInput.scss';
import '../../styles/sign-up.scss';

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
      name: '',
      email: '',
      password: '',
      levels: {},
    };
    IrisLevelsSelect.subjects.forEach((v) => {
      this.state.levels[v[0]] = '0';
    });
    this.checkFields = this.checkFields.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  checkFields() {
    this.setState(prevState => ({
      allFieldsDone: (
        prevState.name !== ''
        && prevState.email !== ''
        && prevState.password !== ''
        && validateEmail(prevState.email)
      ),
    }));
  }

  registerUser() {
    const {
      name, email, password,
    } = this.state;
    this.props.onComplete({
      utype: 'volunteer',
      email,
      name,
      pwd: password,
      levels: this.state.levels,
    });
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
        <section role="region" aria-label="basic information">
          <div
            className="sign-up-question"
            role="group"
            aria-label="Tell us your name"
          >
            {wrapQuestion('What\'s your name?', 'name-input')}
            <input
              id="name-input"
              placeholder="Albert Einstein"
              className="iris-input"
              aria-label="Type your name here"
              onChange={({ target: { value } }) => this.setState(
                { name: value },
                this.checkFields,
              )}
              value={this.state.name}
            />
          </div>
          <div
            className="sign-up-question"
            role="group"
            aria-label="What is your email address"
          >
            {wrapQuestion('And your email address?', 'email-input')}
            <input
              id="email-input"
              type="email"
              placeholder="You'll use this to login"
              className={`iris-input ${validateEmail(this.state.email) ? '' : 'invalid'}`}
              onChange={({ target: { value } }) => this.setState(
                { email: value },
                this.checkFields,
              )}
              value={this.state.email}
            />
          </div>
          <div
            className="sign-up-question"
            role="group"
            aria-label="Set a password"
          >
            {wrapQuestion('Next, set a password:', 'password-input')}
            <input
              id="password-input"
              type="password"
              placeholder="Type a password"
              className="iris-input"
              onChange={({ target: { value } }) => this.setState(
                { password: value },
                this.checkFields,
              )}
              value={this.state.password}
            />
          </div>
        </section>
        <section
          className="w3-row"
          style={{ maxWidth: '80vw', margin: 'auto' }}
          role="region"
          aria-labelledby="about-iris-levels-header"
        >
          <h3 id="about-iris-levels-header">What students can you help?</h3>
          <p>
            Please let us know which students you would feel comfortable helping.
            You can always change these options in your profile.
          </p>
          <IrisLevelsSelect
            levels={this.state.levels}
            onChange={(s, v) => this.setState(
              prevState => ({
                levels: Object.assign({}, prevState.levels, { [`${s}`]: v }),
              }),
            )}
          />
        </section>
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
