import React from 'react';
import PropTypes from 'prop-types';

const MessageOrderSelector = ({ onChange }) => (
  <select
    aria-labelledby="message-order-selector-label"
    className="iris-select"
    name="message-order-selector"
    onChange={e => onChange(e.target.value)}
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </select>
);

MessageOrderSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default MessageOrderSelector;
