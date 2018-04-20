import React from 'react';
import PropTypes from 'prop-types';

import IrisButton from './common-resources/IrisButton';

const UnauthorisedPage = props => (
  <div
    className="w3-container w3-card-4 w3-padding-32"
    style={{ width: '80vw', margin: '100px auto' }}
  >
    <h1>You need to Login to see this page!</h1>
    <IrisButton
      text="Go to login"
      type="action"
      onClick={() => props.history.push('/')}
    />
  </div>
);

UnauthorisedPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default UnauthorisedPage;
