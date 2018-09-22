/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import DescriptionsPage from '../DescriptionsPage';
// import { initialState as userState } from '../../reducers/userReducer';
import { initialState as messagesState } from '../../reducers/messagesReducer';
// import { initialState as imagesState } from '../../reducers/imagesReducer';

const props = {
  messages: messagesState.get('messages'),
  isStale: messagesState.get('state').get('isStale'),
  isFetching: messagesState.get('state').get('isFetching'),
  isFiltered: false,
  invalidId: false,
};

describe('The Student MessagesPage', function () {
  let component;
  beforeAll(function () {
    component = shallow(
      <DescriptionsPage {...props} />,
    );
  });
  it('should render correctly', function () {
    expect(component.exists()).toBe(true);
  });
});
it('should display image details correctly');
it('should display messages correctly');
it('should link to conversations correctly');
