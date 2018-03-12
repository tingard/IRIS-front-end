/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import ImagesPage from '../ImagesPage';
import { initialState as userState } from '../../reducers/userReducer';
import { initialState as messagesState } from '../../reducers/messagesReducer';
import { initialState as imagesState } from '../../reducers/imagesReducer';

const props = {
  user: userState,
  isFetching: imagesState.get('state').get('isFetching') || messagesState.get('state').get('isFetching'),
  images: imagesState.get('images'),
  messages: messagesState.get('messages'),
};

describe('The Student ImagesPage', function () {
  let component;
  beforeEach(function () {
    component = shallow(
      <ImagesPage {...props} />,
    );
  });
  it('should render correctly', function () {
    expect(component.exists()).toBe(true);
  });
});
it('should show images correctly');
it('should fire off events correctly');