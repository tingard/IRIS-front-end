import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Message from './Message';

const MessagesPage = (props) => {
  if (!props.isFiltered || props.invalidId) {
    return <Redirect to="/images" />;
  }
  if (props.isFetching) return <div>Loading Spinner</div>;
  return (
    <main
      aria-labelledby="messages-header"
      className="w3-container w3-animate-opacity"
    >
      <h1 id="messages-header">{props.isFiltered ? 'Messages for your image' : 'Your Messages' }</h1>
      {
        props.messages.size > 0 ? (
          <ul
            style={{ listStyle: 'none', paddingLeft: 0 }}
            aria-label="Messages list"
            role="grid"
            aria-live="polite"
            aria-relevant="additions removals"
          >
            {
              props.messages.map(m => <li key={m.get('_id')} role="row"><Message {...m.toObject()} /></li>)
            }
          </ul>
        ) : (
          <p>{'You don\'t have any messages right now'}</p>
        )
      }
    </main>
  );
};

MessagesPage.propTypes = {
  isFetching: PropTypes.bool,
  isFiltered: PropTypes.bool,
  invalidId: PropTypes.bool,
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      _id: PropTypes.string,
      messages: ImmutablePropTypes.listOf(
        ImmutablePropTypes.contains({
          message: PropTypes.string,
        }),
      ),
    }),
  ),
};

export default MessagesPage;
