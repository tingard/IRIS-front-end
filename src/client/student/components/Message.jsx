import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MainPage = (props) => {
  const m = props.messageChain[props.messageChain.length - 1];
  const dT = (Date.now() - m.date) / (1000);
  let dTmessage;
  if (dT < 60) { // less than a minute
    dTmessage = 'Just now';
  } else if (dT < 3600) { // less than an hour
    dTmessage = `${parseInt(dT / 60, 10)} minutes ago`;
  } else if (dT < 86400) { // less than a day
    dTmessage = `${parseInt(dT / 3600, 10)} hour${parseInt(dT / 3600, 10) > 1 ? 's' : ''} ago`;
  } else { // more than a day
    dTmessage = `${parseInt(dT / 86400, 10)} days ago`;
  }
  return (
    <div className="w3-card-4 w3-panel">
      <p>
        <span>For the Image you uploaded tagged: <em>{`"${props.imageNote}"`}</em>, </span>
        <span>most recent message {dTmessage}:</span>
      </p>
      <p>{m.fromMe ? 'You said:' : 'They said:'} {m.message}</p>
      <Link to={`/messages/${props.id}`}>
        View all messages in this chain
      </Link>
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
