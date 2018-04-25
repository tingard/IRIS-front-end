import React from 'react';
import { Elements } from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';
// import PaymentRequestForm from './PaymentRequestForm';
// TODO: add
// <Elements>
//   <PaymentRequestForm {...props} />
// </Elements>


const MyStoreCheckout = props => (
  <div>
    <Elements>
      <InjectedCheckoutForm {...props} />
    </Elements>
  </div>
);

export default MyStoreCheckout;
