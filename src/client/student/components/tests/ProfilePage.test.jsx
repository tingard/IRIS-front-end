/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from '../ProfilePage';
import { initialState as userState } from '../../reducers/userReducer';
// import { initialState as messagesState } from '../../reducers/messagesReducer';
// import { initialState as imagesState } from '../../reducers/imagesReducer';

describe('The Student ProfilePage', function () {
  let component;
  beforeAll(function () {
    component = shallow(
      <ProfilePage {...userState.toObject()} />,
    );
  });
  it('should render correctly', function () {
    expect(component.exists()).toBe(true);
  });
  it('should display the correct profile information');
  it('should send off profile updates correctly');
});
