import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Message from './Message';

const MessagesPage = props => (
  <main role="region" aria-labelledby="messages-header" className="w3-container w3-animate-opacity">
    <h1 id="messages-header">Your Messages:</h1>
    {
      props.messages.size > 0 ? (
        <ul style={{ listStyle: 'none', paddingLeft: 0 }} aria-label="Messages list" role="grid">
          {
            props.messages.map(m => <li key={m.get('id')} role="row"><Message {...m} /></li>)
          }
        </ul>
      ) : (
        <p>{'You don\'t have any messages right now'}</p>
      )
    }
  </main>
);

MessagesPage.propTypes = {
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string,
      messageChain: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          message: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default MessagesPage;
