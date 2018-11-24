/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Link } from 'react-router-dom';

const AboutLicenceOwner = () => (
  <div
    className="iris-narrow-page w3-row-padding w3-animate-opacity"
    style={{ zIndex: 1, backgroundColor: 'white' }}
  >
    <h3 className="w3-padding-16 w3-margin-bottom">
      Thanks for your interest in IRIS!
    </h3>
    <div className="w3-row" role="group" aria-label="Tell us your name">
      <p>
        As we want to make sure to offer the best possible service to your
        students, we manually create Licence-owner accounts.
      </p>
      <p>
        Please email us at
        {' '}
        <a href="mailto:contact@grapheel.com">contact@grapheel.com</a>
        {' '}
        to express your interest, and a member of the team will get in contact
        as soon as possible!
      </p>
    </div>
    <div className="w3-row w3-padding-16">
      <Link to="/create">Go Back</Link>
    </div>
  </div>
);

export default AboutLicenceOwner;
