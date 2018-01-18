import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Select from 'react-select';

import Circle from '../svg/basic-circle.svg';
import FullPageSpinner from './FullPageSpinner';

const subjects = [
  ['physics', 'Physics'],
  ['biology', 'Biology'],
  ['chemistry', 'Chemistry'],
  ['maths', 'Maths'],
  ['computerScience', 'Computer Science'],
];
const level = [
  { value: '0', label: 'None' },
  { value: '1', label: 'GCSE level' },
  { value: '2', label: 'A-level' },
  { value: '3', label: 'Degree level' },
];

const ProfilePage = (props) => {
  if (props.user.get('isFetching')) return <FullPageSpinner />;
  return (
    <div className="profile-page">
      <div className="row">
        <div className="w3-card-2 w3-container">
          <div className="w3-row">
            <div className="w3-col s4">
              <div style={{ padding: '10px', textAlign: 'center' }}>
                <Circle width={100} />
              </div>
            </div>
            <div className="w3-col s8">
              <h3>{props.user.get('firstName')} {props.user.get('lastName')}</h3>
              <p>Active since {props.user.get('creationDate')}</p>
              <p>Points: {props.user.get('points')}</p>
            </div>
          </div>
        </div>
        <div className="">
          <h3>User levels</h3>
          {subjects.map(s => (
            <label htmlFor={`profile-page-${s[0]}-level`} key={`profile-page-${s[0]}-level`}>
              <div className="w3-row">
                <div className="w3-col s3">
                  <p style={{ textAlign: 'right', paddingRight: '5px' }}>{s[1]}:</p>
                </div>
                <div className="w3-col s9" style={{ paddingTop: '8px' }}>
                  <Select
                    id={`profile-page-${s[0]}-level`}
                    value={props.user.get('levels').get(s[0]).toString()}
                    onChange={v => props.setUserDetails(
                      {
                        id: props.user.get('id'),
                        details: { levels: { [`${s[0]}`]: parseInt(v.value, 10) } },
                      },
                    )}
                    options={level}
                  />
                </div>
              </div>
            </label>
          ))}
        </div>
        <p>TODO: browser / email notification preferences</p>
        <div className="w3-row">
          <button
            disabled
            className="change-pwd-button w3-button w3-border w3-round w3-bar w3-hover-black"
          >
            Change Password
          </button>
        </div>
        <div className="w3-row">
          <button
            disabled
            className="delete-acc-button w3-button w3-border w3-round w3-bar w3-hover-black"
          >
            Delete Account
          </button>
        </div>
        <div className="w3-row w3-padding-48" />
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  user: ImmutablePropTypes.contains({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    emailNotifications: PropTypes.bool,
    browserNotifications: PropTypes.bool,
    points: PropTypes.number,
    bio: PropTypes.string,
    level: ImmutablePropTypes.contains({
      physics: PropTypes.number,
      biology: PropTypes.number,
      chemistry: PropTypes.number,
      maths: PropTypes.number,
      computerScience: PropTypes.number,
    }),
  }),
};
export default ProfilePage;
