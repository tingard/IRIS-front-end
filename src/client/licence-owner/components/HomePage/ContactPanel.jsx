import React from 'react';
import PropTypes from 'prop-types';
import IrisButton from '../../../common-resources/IrisButton';

const ContactPanel = props => (
  <div className="panel contact-us">
    <h3>
        Contact us
    </h3>
    <p>
      If you have any questions about IRIS or Grapheel's other programs,
      please get in touch by emailing
      &nbsp;<a href="mailto:contact@grapheel.com">contact@grapheel.com</a>&nbsp;
      or finding us on&nbsp;
      <a
        href="https://twitter.com/grapheelTeam"
        target="_blank"
        rel="noopener noreferrer"
      >
        Twitter
      </a>.
    </p>
    <IrisButton type="tertiary" onClick={props.logout} text="Logout" />
  </div>
);

ContactPanel.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default ContactPanel;
