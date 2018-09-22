/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import { Map, List } from 'immutable';
import ConversationPage from '../ConversationPage';
import { initialState as userState } from '../../reducers/userReducer';
// import { initialState as messagesState } from '../../reducers/messagesReducer';
// import { initialState as imagesState } from '../../reducers/imagesReducer';

const props = {
  user: userState,
  isFetching: false,
  isStale: false,
  _id: 'fake-id',
  message: Map({
    messages: List([
      Map({ message: 'test-message' }),
    ]),
    image: Map({
      url: 'https://www.grapheel.com/wp-content/uploads/2018/01/GrapheelFinalLogo_small.jpg',
      note: 'test-image-note',
      question: 'test-image-question',
    }),
  }),
  sendMessage: jest.fn(),
};

describe('The Student ProfilePage', function () {
  let component;
  beforeAll(function () {
    component = shallow(
      <ConversationPage {...props} />,
    );
  });
  it('should render correctly', function () {
    expect(component.exists()).toBe(true);
  });
  it('should display the correct messages');
  it('should reply to messages correctly');
});
