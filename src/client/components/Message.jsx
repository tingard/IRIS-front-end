import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, messageDate }) => (
  <div
    className="w3-container w3-border w3-round w3-card-2"
    style={{ minHeight: '100px', marginTop: '20px', padding: '5px' }}
  >
    <div className="w3-row">
      <div className="w3-col s4">
        Received {messageDate.split(' ')[0]} {messageDate.split(' ')[1]}
      </div>
      <div className="w3-col s4">
        {message}
      </div>
      <div className="w3-col s4" style={{ width: '100%' }}>
        <div className="w3-display-container">
          <div className="w3-display-right">
            <div className="w3-row" style={{ margin: '5px 0', width: '100%' }}>
              <button className="w3-btn" style={{ width: '100%' }}>Actions button</button>
            </div>
            <div className="w3-row" style={{ margin: '5px 0', width: '100%' }}>
              <button className="w3-btn" style={{ width: '100%' }}>Actions button 2</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Message.propTypes = {
  message: PropTypes.string.isRequired,
  messageDate: PropTypes.string.isRequired,
};

export default Message;
