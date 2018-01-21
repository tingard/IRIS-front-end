// index.js
import React from 'react';
import PropTypes from 'prop-types';
import { StripeProvider } from 'react-stripe-elements';

import StoreCheckout from './StoreCheckout';

const RegisterStripeCard = props => (
  <StripeProvider stripe={props.stripe}>
    <div>
      <StoreCheckout {...props} />
    </div>
  </StripeProvider>
);

RegisterStripeCard.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  stripe: PropTypes.object,
  /* eslint-enable react/forbid-prop-types */
};

export default RegisterStripeCard;
