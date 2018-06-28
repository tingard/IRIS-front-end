import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CancelPage = props => (
  <div className="licence-owner-page">
    <div className="panel">
      <h3>Connect a student to a licence</h3>
      <p>
        To connect a student to one of your licences, please email&nbsp;
        <a href="mailto:contact@grapheel.com?subject=Link a licence to a student">
          contact@grapheel.com
        </a>
      </p>
      {props.match.params.licenceId ? (
        <React.Fragment>
          <p>
            In your email, please quote the licence ID: {props.match.params.licenceId},
            as well as the email address of the student account to connect to
          </p>
        </React.Fragment>
        ) : null
      }
      <Link to="/licence-owner" className="iris-button tertiary">Go back</Link>
    </div>
  </div>

);

CancelPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      licenceId: PropTypes.string,
    }),
  }),
};

CancelPage.defaultProps = {
  match: {
    params: {},
  },
};

export default CancelPage;
