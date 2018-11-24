/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import '../../../common-resources/_IrisInput.scss';
import '../../../common-resources/_IrisCheckbox.scss';
import validateEmail from '../../../common-resources/validateEmail';
import IrisAlert from '../../../common-resources/IrisAlert';
import IrisButton from '../../../common-resources/IrisButton';
import RegisterStripeCard from './registerStripeCard';
import '../../styles/sign-up.scss';

const wrapQuestion = (q, htmlFor) => (
  <MediaQuery minWidth={601}>
    {(matches) => {
      if (matches) {
        return (
          <label htmlFor={htmlFor}>
            {q}
          </label>
        );
      }
      return (
        <label htmlFor={htmlFor}>
          {q}
        </label>
      );
    }}
  </MediaQuery>
);

class StudentInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidEmail: true,
      allFieldsDone: false,
      payForOwnLicence: false,
      name: '',
      email: '',
      password: '',
      cardToken: null,
    };
    this.stripe = new Stripe('pk_test_dkKtfYjdT6PXQKYtNseZmkPb');
    this.checkFields = this.checkFields.bind(this);
    this.registerCard = this.registerCard.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  getUser() {
    const {
      name, email, password, cardToken,
    } = this.state;
    return {
      name, email, password, cardToken,
    };
  }

  checkFields() {
    this.setState(prevState => ({
      allFieldsDone: (
        prevState.name !== ''
        && prevState.email !== ''
        && prevState.password !== ''
        && validateEmail(prevState.email)
        && (!prevState.payForOwnLicence || !!(prevState.cardToken || false))
      ),
    }));
  }

  registerCard(cardToken) {
    console.log('registered card');
    this.setState(
      { cardToken },
      this.checkFields,
    );
  }

  registerUser() {
    const {
      name, email, password, cardToken,
    } = this.state;
    this.props.onComplete({
      utype: 'student', name, email, pwd: password, cardToken,
    });
  }

  render() {
    return (
      <div
        className="w3-row-padding w3-animate-opacity"
        style={{ zIndex: 1, backgroundColor: 'white' }}
      >
        <h3
          className="w3-padding-16 w3-margin-bottom"
          style={{ maxWidth: '80vw', margin: 'auto' }}
        >
          We look forward to being able to help you!
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
              className={`iris-input ${this.state.isValidEmail ? '' : 'invalid'}`}
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
          aria-labelledby="about-iris-payment-header"
        >
          <h3 id="about-iris-payment-header">About IRIS payment</h3>
          <p>
            Grapheel is a not-for-profit organisation, but we need to feed the hamsters
            that power our servers. For this reason we charge a subscription in order to access
            IRIS of around £5 a month.
          </p>
          <p>
            All our costs are transparent, and will be listed on our website. If we've had a
            good month then we may issue discounts on the following month's subscription
            (don't worry, we'll never charge you more than you signed up for)
          </p>
        </section>
        <section
          className="w3-row"
          style={{ maxWidth: '80vw', margin: 'auto' }}
          role="region"
          label="Payment information"
        >
          <h3
            className="w3-padding-16 w3-margin-bottom"
            style={{ maxWidth: '80vw', margin: 'auto' }}
          >
            Add payment details
          </h3>
          <div className="w3-padding-16">
            <label
              htmlFor="student-sign-up__paying-for-own"
              className="iris-checkbox-container"
            >
              I am paying for my own IRIS subscription:
              <input
                type="checkbox"
                className="no-mouseflow"
                id="student-sign-up__paying-for-own"
                checked={this.state.payForOwnLicence}
                onChange={e => this.setState(
                  { payForOwnLicence: e.target.checked },
                  this.checkFields,
                )}
              />
              <span className="iris-checkbox-checkmark" />
            </label>
          </div>
          { this.state.payForOwnLicence ? (
            <React.Fragment>
              <div
                className="w3-row w3-margin-bottom"
                role="group"
                aria-label="Your payment details"
              >
                <h3
                  className="w3-padding-16 w3-margin-bottom"
                  style={{ maxWidth: '80vw', margin: 'auto' }}
                >
                  Add payment details
                </h3>
                <MediaQuery minWidth={601}>
                  {
                    m => (
                      m ? (
                        <div style={{ margin: 'auto', width: '70vw' }}>
                          <RegisterStripeCard
                            stripe={this.stripe}
                            registerCard={this.registerCard}
                            user={this.getUser()}
                          />
                        </div>
                      ) : (
                        <div>
                          <RegisterStripeCard
                            stripe={this.stripe}
                            user={this.getUser()}
                            registerCard={this.registerCard}
                          />
                        </div>
                      )
                    )
                  }
                </MediaQuery>
              </div>
              {((this.state.cardToken || false) && !this.state.cardLinkStatusDismissed) ? (
                <IrisAlert
                  title="Card successfully linked"
                  message="This card will be linked to your account"
                  type="success"
                  onClose={() => this.setState({ cardLinkStatusDismissed: true })}
                />) : null}
            </React.Fragment>
          ) : (
            <p>
              During the beta, feel free to test the card input system, or uncheck
              the "paying for own subscription" checkbox to continue.
            </p>
          )}
        </section>
        <div className="w3-row">
          <IrisButton
            disabled={this.state.payForOwnLicence && (!this.state.allFieldsDone)}
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

StudentInformation.propTypes = {
  onComplete: PropTypes.func,
};
export default StudentInformation;
