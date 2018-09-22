import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

const capitalize = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

const Message = ({ message }) => (
  <div className="message-box">
    <div className="message-info">
      <span className="message-dt mf-disable">
        {capitalize(moment(message.get('sendDate')).fromNow())}
      </span>
      <span className="message-from-who">
        {message.get('fromType') === 'student' ? ' you said: ' : ' they said: '}
      </span>
    </div>
    <div className="message-content mf-disable">
      {message.get('message')}
    </div>
  </div>
);

Message.propTypes = {
  message: ImmutablePropTypes.contains({
    message: PropTypes.string,
  }),
};

export default Message;
