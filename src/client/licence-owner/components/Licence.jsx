import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Licence = props => (
  <div className="iris-licence">
    <p>Licence purchased on {props.licence.get('startDate')}, active until {props.licence.get('endDate')}</p>
    <p>{props.licence.get('isActive') ? 'Currently active' : 'Not in use'} active</p>
  </div>
);

Licence.propTypes = {
  licence: ImmutablePropTypes.contains({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    isActive: PropTypes.bool,
  }),
};

export default Licence;
