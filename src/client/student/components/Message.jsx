import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MainPage = (props) => {
  const m = props.messageChain[props.messageChain.length - 1];
  return (
    <div role="gridcell" aria-live="polite" className="w3-card-4 w3-panel">
      <div role="group">
        <p>
          For the Image you uploaded tagged:
          <em>{` "${props.imageNote}"`}</em>,
        </p>
        <p>
          <span>Most recent message {moment(m.date).fromNow()}.</span>
          <span>{m.fromMe ? ' You said:' : ' They said:'} {m.message}</span>
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

MainPage.propTypes = {
  id: PropTypes.string,
  imageNote: PropTypes.string,
  messageChain: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string,
    }),
  ),
};

export default MainPage;
