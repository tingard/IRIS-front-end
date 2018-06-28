import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

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
        <Link
          className="iris-button primary"
          to={`/licence-owner/student/${props.licence.get('_id')}`}
        >
          View student
        </Link>
      ) : (
        <Link
          className="iris-button primary"
          to={`/licence-owner/connect/${props.licence.get('_id')}`}
        >
          Attach to student
        </Link>
      )}
      <Link
        className="iris-button tertiary"
        to={`/licence-owner/cancel/${props.licence.get('_id')}`}
      >
        Cancel this licence
      </Link>
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
