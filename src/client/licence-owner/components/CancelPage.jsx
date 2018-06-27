import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import IrisLoader from '../../common-resources/IrisLoader';

const RepliesPage = props => (
  <div className="licence-owner-page">
    {props.state.get('isFetching') || !props.image ? <IrisLoader /> : (
      <div className="panel">
        <h3>Cancel a licence</h3>
        <p>
          If you would like  to cancel a licence, please email us at
          <a href="mailto:contact@grapheel.com">contact@grapheel.com</a>
          with the email address of the student account whose licence needs cancelling
        </p>
        {props.match.params.licenceId ? (
          <p>Alternatively, please quote the licence ID: {props.match.params.licenceId}</p>
          ) : null
        }
        <Link to="/licence-owner" className="iris-button tertiary">Go back</Link>
      </div>
    )}
  </div>

);

RepliesPage.propTypes = {
  image: ImmutablePropTypes.contains({
    _id: PropTypes.string.isRequired,
  }),
  state: ImmutablePropTypes.contains({
    isLoading: PropTypes.bool,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      licenceId: PropTypes.string,
    }),
  }),
};

export default RepliesPage;
