import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

const MyStoreCheckout = props => (
  <div>
    <Elements>
      <InjectedCheckoutForm {...props} />
    </Elements>
  </div>
);

export default MyStoreCheckout;
