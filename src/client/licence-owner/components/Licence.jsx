import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Licence = props => (
  <div className="iris-licence">
    <p>Licence purchased on {props.licence.get('startDate')}, active until {props.licence.get('endDate')}</p>
  </div>
);

Licence.propTypes = {
  licence: ImmutablePropTypes.contains({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
};

export default Licence;
