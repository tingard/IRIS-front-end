import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import IrisLoader from '../../../common-resources/IrisLoader';
import Licence from './Licence';

const LicencesPanel = ({ state, licences }) => (
  <div className="panel licences">
    {state.get('isStale') ? <IrisLoader /> : (
      <React.Fragment>
        <h2>Your Licences</h2>
        <ul>
          {licences.map(
            licence => <Licence key={licence.get('_id')} licence={licence} />,
          )}
        </ul>
      </React.Fragment>
    )}
    <Link
      to="/licence-owner/purchase"
      className="iris-button floating action"
      aria-label="Purchase a licence"
    >
      +
    </Link>
  </div>
);

LicencesPanel.propTypes = {
  state: ImmutablePropTypes.contains({
    isStale: PropTypes.bool.isRequired,
  }),
  licences: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      _id: PropTypes.string.isRequired,
    }),
  ),
};

export default (props) => {
  console.log(props);
  return <LicencesPanel {...props} />;
};
