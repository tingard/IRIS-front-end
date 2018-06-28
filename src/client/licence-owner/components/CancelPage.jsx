import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CancelPage = props => (
  <div className="licence-owner-page">
    <div className="panel">
      <h3>Cancel a licence</h3>
      <p>
        If you would like  to cancel a licence, please email us at&nbsp;
        <a href="mailto:contact@grapheel.com?subject=Cancel an IRIS licence">
          contact@grapheel.com
        </a>
      </p>
      {props.match.params.licenceId ? (
        <React.Fragment>
          <p>
            In your email, please quote the licence ID: {props.match.params.licenceId},
            as well as the email address of the student account whose licence needs cancelling
          </p>
        </React.Fragment>
        ) : null
      }
      <p>
        We will then cancel renewal of your licence, and the licence will expire
        one month after your most recent payment
      </p>
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
