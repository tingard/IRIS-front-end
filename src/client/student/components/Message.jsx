import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Message = (props) => {
  const m = props.messageChain.get(props.messageChain.size - 1);
  console.log('message m', m.toObject());
  return (
    <div role="gridcell" aria-live="polite" className="w3-card-4 w3-panel">
      <div role="group">
        <p>
          For your image tagged:
          <em>{` "${props.image.get('note')}"`}</em>,
        </p>
        <p>
          <span>Most recent message {moment(m.get('sendDate')).fromNow()}.</span>
          <span>{m.get('fromType') === 'student' ? ' You said:' : ' They said:'} {m.get('message')}</span>
        </p>
        <Link
          to={`/messages/${props.id}`}
        >
          Read all messages in this conversation
        </Link>
      </div>
    </div>
  );
};

Message.propTypes = {
  id: PropTypes.string,
  image: ImmutablePropTypes.contains({
    note: PropTypes.string,
  }),
  messageChain: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      message: PropTypes.string,
    }),
  ),
};

export default Message;
