import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';
import IrisButton from '../../../common-resources/IrisButton';

const Licence = props => (
  <li role="listitem" className="iris-licence">
    <h3>
      Licence purchased {moment(props.licence.get('purchaseDate')).fromNow()}
    </h3>
    {props.licence.get('student') ? (
      <p>Attached to: <span className="mf-disable">email goes here</span></p>
    ) : (
      <p>Not attached to a student account yet</p>
    )}
    <div>
      {props.licence.get('student') ? (
        <IrisButton
          text="View student"
          type="primary"
        />
      ) : (
        <IrisButton
          text="Attach to student"
          type="primary"
        />
      )}
      <IrisButton
        text="Cancel this licence"
        type="tertiary"
      />
    </div>
  </li>
);

Licence.propTypes = {
  licence: ImmutablePropTypes.contains({
    purchaseDate: PropTypes.string.isRequired,
    student: PropTypes.oneOfType([
      PropTypes.bool,
      ImmutablePropTypes.contains({
        email: PropTypes.string.isRequired,
      }),
    ]),
  }),
};

export default Licence;
