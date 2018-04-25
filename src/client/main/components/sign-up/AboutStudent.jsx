/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import IrisAlert from '../../../common-resources/IrisAlert';
import IrisButton from '../../../common-resources/IrisButton';
import RegisterStripeCard from './registerStripeCard';

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

class AboutStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidEmail: true,
      allFieldsDone: false,
      payForOwnLicence: false,
      user: {},
    };
    this.stripe = new Stripe('pk_test_dkKtfYjdT6PXQKYtNseZmkPb');
    this.validateEmail = this.validateEmail.bind(this);
    this.checkFields = this.checkFields.bind(this);
    this.registerCard = this.registerCard.bind(this);
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
      this.nameInput.value !== '' &&
      this.state.isValidEmail &&
      (!this.state.payForOwnLicence || !!(this.state.user.cardToken || false))
    );
    this.setState({
      allFieldsDone,
      user: {
        name: this.nameInput.value,
        email: this.emailInput.value,
        pwd: this.passwordInput.value,
        cardToken: this.state.user.cardToken,
        licenceId: '',
      },
      cardLinkStatusDismissed: false,
    });
  }
  registerCard(cardToken) {
    this.setState(
      { user: Object.assign({}, this.state.user, { cardToken }) },
      this.checkFields,
    );
  }
  registerUser() {
    const payload = Object.assign(
      { utype: 'student' },
      this.state.user,
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
          We look forward to being able to help you!
        </h3>
        <section role="region" aria-label="basic information">
          <div className="w3-row w3-margin-bottom" role="group" aria-label="Tell us your name">
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
            className="w3-row w3-margin-bottom"
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
            className="w3-row w3-margin-bottom"
            role="group"
            aria-label="Set a password"
          >
            {wrapQuestion('Next, set a password:', 'passwordInput')}
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
          <label className="switch" htmlFor="pay-for-own-licence-checkbox">
            <span>I am paying for my own IRIS subscription:</span>
            <input
              type="checkbox"
              className="grapheel-checkbox no-mouseflow"
              id="pay-for-own-licence-checkbox"
              name="pay-for-own-licence-checkbox"
              ref={(r) => { this.ownLicenceCheckbox = r; }}
              checked={this.state.payForOwnLicence}
              onChange={e => this.setState(
                { payForOwnLicence: e.target.checked },
                this.checkFields,
              )}
            />
          </label>
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
                            user={this.state.user}
                          />
                        </div>
                      ) : (
                        <div>
                          <RegisterStripeCard
                            stripe={this.stripe}
                            user={this.state.user}
                            registerCard={this.registerCard}
                          />
                        </div>
                      )
                    )
                  }
                </MediaQuery>
              </div>
              {((this.state.user.cardToken || false) && !this.state.cardLinkStatusDismissed) ? (
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

AboutStudent.propTypes = {
  onComplete: PropTypes.func,
};
export default AboutStudent;
