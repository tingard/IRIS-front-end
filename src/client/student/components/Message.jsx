import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Message = (props) => {
  const m = props.messages.get(props.messages.size - 1);
  return (
    <div role="gridcell" aria-live="polite" className="w3-border-left w3-panel">
      <div role="group">
        <p>
          For your image tagged:
          <em className="mf-disable">{` "${props.image.get('note')}"`}</em>,
        </p>
        <p>
          Most recent message <span className="mf-disable">{moment(m.get('sendDate')).fromNow()}</span>.
        </p>
        <p className="mf-disable">
          {m.get('fromType') === 'student' ? 'You said:' : 'They said:'} {m.get('message')}
        </p>
        <Link
          to={`/messages/${props._id}`}
        >
          Read all messages in this conversation
        </Link>
      </div>
    </div>
  );
};

Message.propTypes = {
  _id: PropTypes.string,
  image: ImmutablePropTypes.contains({
    note: PropTypes.string,
  }),
  messages: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      message: PropTypes.string,
    }),
  ),
};

export default Message;
