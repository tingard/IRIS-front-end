import React from 'react';
import PropTypes from 'prop-types';
import { injectStripe } from 'react-stripe-elements';
// import AddressSection from './AddressSection';
import CardSection from './CardSection';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(ev) {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.button.disabled = true;
    this.props.stripe.createToken({ name: this.props.user.name }).then(({ token }) => {
      this.props.registerCard(token);
    });
    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardSection />
        <button
          className="w3-button w3-round w3-blue w3-margin-top"
          ref={(r) => { this.button = r; }}
        >
          Register Card
        </button>
      </form>
    );
  }
}
CheckoutForm.propTypes = {
  stripe: PropTypes.shape({
    createToken: PropTypes.func,
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
  registerCard: PropTypes.func,
};

export default injectStripe(CheckoutForm);
