import React from 'react';
import PropTypes from 'prop-types';
import IrisSelect from '../../common-resources/IrisSelect';

const subjects = [
  ['physics', 'Physics'],
  ['biology', 'Biology'],
  ['chemistry', 'Chemistry'],
  ['maths', 'Maths'],
  ['computerScience', 'Computer Science'],
  ['psychology', 'Psychology'],
  ['finance', 'Finance'],
];

const levelOptions = [
  { value: '0', text: 'None' },
  { value: '1', text: 'GCSE level' },
  { value: '2', text: 'A-level' },
  { value: '3', text: 'Degree level' },
];

const UserLevelsSelect = ({ levels, onChange }) => (
  <React.Fragment>
    <h3>User levels</h3>
    {subjects.map(s => (
      <label htmlFor={`profile-page-${s[0]}-level`} key={`profile-page-${s[0]}-level`}>
        <div className="w3-row">
          <div className="w3-col s3">
            <p style={{ textAlign: 'right', paddingRight: '5px' }}>{s[1]}:</p>
          </div>
          <div
            className="w3-col s9"
            style={{ paddingTop: '5px' }}
            mf-data-replace={`${s[0]} level select`}
          >
            <IrisSelect
              id={`profile-page-${s[0]}-level`}
              label=""
              options={levelOptions}
              value={levels[s[0]].toString()}
              onChange={v => onChange(s[0], v)}
            />
          </div>
        </div>
      </label>
    ))}
  </React.Fragment>
);

UserLevelsSelect.propTypes = {
  levels: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default UserLevelsSelect;
