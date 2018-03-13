/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import ProfilePage from '../ProfilePage';
import { initialState as userState } from '../../reducers/userReducer';
// import { initialState as messagesState } from '../../reducers/messagesReducer';
// import { initialState as imagesState } from '../../reducers/imagesReducer';

describe('The Student ProfilePage', function () {
  let component;
  beforeEach(function () {
    component = shallow(
      <ProfilePage {...userState.toObject()} />,
    );
  });
  it('should render correctly', function () {
    expect(component.exists()).toBe(true);
  });
});
