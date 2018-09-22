/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import IrisAlert from '../IrisAlert';

describe('<IrisAlert />', function () {
  const closeSpy = sinon.spy();
  const component = shallow(
    <IrisAlert title="test-title" message="test-message" type="test" onClose={closeSpy} />,
  );
  it('should render without crashing', function () {
    expect(component.exists()).toBe(true);
  });
  it('should be of the right type', function () {
    expect(component.find('.iris-alert.test').length).toEqual(1);
  });
  it('should have the right title', function () {
    expect(component.find('.iris-alert-title').text()).toEqual('test-title');
  });
  it('should have the right message', function () {
    expect(component.find('.iris-alert-message').text()).toEqual('test-message');
  });
  it('should have a close button', function () {
    expect(component.find('button').length).toEqual(1);
  });
  it('should call onClose when closed', function () {
    component.find('button').simulate('click');
    expect(closeSpy.calledOnce).toBe(true);
  });
});
