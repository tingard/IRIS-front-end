import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import moment from 'moment';

const MainPage = (props) => {
  const m = props.messageChain.get(props.messageChain.length - 1);
  return (
    <div role="gridcell" aria-live="polite" className="w3-card-4 w3-panel">
      <div role="group">
        <p>
          For your image tagged:
          <em>{` "${props.imageNote}"`}</em>,
        </p>
        <p>
          <span>Most recent message {moment(m.get('date')).fromNow()}.</span>
          <span>{m.get('fromMe') ? ' You said:' : ' They said:'} {m.get('message')}</span>
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
  messageChain: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      message: PropTypes.string,
    }),
  ),
};

export default MainPage;
