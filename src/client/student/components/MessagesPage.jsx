import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const MessagesPage = props => (
  <div className="w3-container w3-animate-opacity">
    <h1>Your Messages:</h1>
    {
      props.messages.map(m => <Message key={m.id} {...m} />)
    }
  </div>
);

MessagesPage.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      messageChain: PropTypes.arrayOf(
        PropTypes.shape({
          message: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default MessagesPage;
