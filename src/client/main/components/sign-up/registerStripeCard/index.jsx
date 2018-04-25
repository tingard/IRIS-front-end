/* eslint-disable react/forbid-prop-types */
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
  stripe: PropTypes.object.isRequired,
};

export default RegisterStripeCard;
