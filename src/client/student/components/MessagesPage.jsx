import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const MessagesPage = props => (
  <main role="region" aria-labelledby="messages-header" className="w3-container w3-animate-opacity">
    <h1 id="messages-header">Your Messages:</h1>
    <ul style={{ listStyle: 'none', paddingLeft: 0 }} aria-label="Messages list" role="grid">
      {
        props.messages.map(m => <li key={m.id} role="row"><Message {...m} /></li>)
      }
    </ul>
  </main>
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
