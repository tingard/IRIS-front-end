import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import IrisLoader from '../../common-resources/IrisLoader';
import ImageDetails from './ImageDetails';

const StudentPage = props => (
  <div className="licence-owner-page">
    {props.student ? (
      <div className="panel">
        <h3>Student Information</h3>
        <p>Name: {props.student.get('name')}</p>
        <p>Email: {props.student.get('email')}</p>
        <p>Number of images on IRIS: {props.student.get('images').size}</p>
        <ul>
          {props.student.get('images').map(
            image => (
              <li>
                <ImageDetails image={image} history={props.history} />
              </li>
            ),
          )}
        </ul>
        <Link to="/licence-owner" className="iris-button tertiary">Go back</Link>
      </div>
    ) : <IrisLoader />}
  </div>

);

StudentPage.propTypes = {
  student: ImmutablePropTypes.contains({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default StudentPage;
