/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { CardElement } from 'react-stripe-elements';

const CardSection = () => (
  <label htmlFor="payment-card">
    Card details
    <CardElement style={{ base: { fontSize: '18px' } }} />
  </label>
);

export default CardSection;
