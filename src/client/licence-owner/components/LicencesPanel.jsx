import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FullPageSpinner from '../../common-resources/FullPageSpinner';
import Licence from './Licence';

const LicencesPanel = ({ state, licences }) => (
  <div className="panel licences">
    {state.get('isStale') ? <FullPageSpinner /> : (
      <React.Fragment>
        <h1>Welcome back, {this.props.user.get('name')}</h1>
        <h2>Your Licences</h2>
        {licences.map(
          licence => <Licence key={licence.get('_id')} licence={licence} />,
        )}
      </React.Fragment>
    )}
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

export default LicencesPanel;
