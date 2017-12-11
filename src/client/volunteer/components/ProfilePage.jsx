import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import Circle from '../svg/basic-circle.svg';

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

const ProfilePage = props => (
  <div className="profile-page">
    <div className="row">
      <div className="w3-card-2 w3-container">
        <div className="w3-row">
          <div className="w3-col s4">
            <div style={{ padding: '10px', textAlign: 'center' }}>
              <Circle width={100} />
            </div>
            Hi
          </div>
          <div className="w3-col s8">
            <h3>{props.user.uname}</h3>
            <p>Points: {props.user.points}</p>
            <p>{props.user.bio}</p>
          </div>
        </div>
      </div>
      <div className="">
        <h3>User levels</h3>
        {subjects.map((s) => {
          console.log(s, props.user.level[s[0]].toString());
          return (
            <label htmlFor={`profile-page-${s[0]}-level`} key={`profile-page-${s[0]}-level`}>
              <div className="w3-row">
                <div className="w3-col s3">
                  <p style={{ textAlign: 'right', paddingRight: '5px' }}>{s[1]}:</p>
                </div>
                <div className="w3-col s9" style={{ paddingTop: '8px' }}>
                  <Select
                    name="subject-filter-dropdown"
                    value={props.user.level[s[0]].toString()}
                    onChange={() => {}/* TODO: this from redux */}
                    options={level}
                  />
                </div>
              </div>
            </label>
          );
        })}
      </div>
      <div className="w3-row">
        <button className="change-pwd-button w3-button w3-border w3-round w3-bar w3-hover-black">
          Change Password
        </button>
      </div>
      <div className="w3-row">
        <button className="delete-acc-button w3-button w3-border w3-round w3-bar w3-hover-black">
          Delete Account
        </button>
      </div>
    </div>
  </div>
);

ProfilePage.propTypes = {
  user: PropTypes.shape({
    uname: PropTypes.string,
    points: PropTypes.number,
    bio: PropTypes.string,
  }),
};
export default ProfilePage;
