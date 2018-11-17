import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

const AboutVolunteer = props => (
  <div className="w3-card-2 w3-container">
    <div className="w3-row">
      <div className="w3-col s4">
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <img
            src="/images/irisProposed_withoutBackground_100x100.png"
            className="mf-disable"
            alt="user badge"
            width={100}
          />
        </div>
      </div>
      <div className="w3-col s8">
        <h3 className="mf-disable">{props.user.get('name')}</h3>
        <p>Active since <span className="mf-disable">{moment(props.user.get('creationDate')).fromNow()}</span></p>
        <p>Points: <span className="mf-disable">{props.user.get('points')}</span></p>
      </div>
    </div>
  </div>
);

AboutVolunteer.propTypes = {
  user: ImmutablePropTypes.contains({
    name: PropTypes.string,
    points: PropTypes.number,
    bio: PropTypes.string,
    creationDate: PropTypes.string.isRequired,
  }),
};
export default AboutVolunteer;
