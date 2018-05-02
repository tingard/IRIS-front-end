import React from 'react';
// import PropTypes from 'prop-types';

const ContactPanel = () => (
  <div className="panel feedback">
    <h3>
        Feedback
    </h3>
    <p>
      IRIS is under constant development, if you spot a bug please let us know
      using our feedback portal on GitHub, or by sending us an email!
    </p>
    <a
      className="iris-button action"
      href="https://github.com/Grapheel/IRIS"
      target="_blank"
      rel="noopener noreferrer"
    >
      Leave Feedback
    </a>
  </div>
);

export default ContactPanel;
