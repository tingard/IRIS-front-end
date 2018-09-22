/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import IrisButton from '../IrisButton';

describe('<IrisAlert />', function () {
  const clickSpy = sinon.spy();
  const props = { text: 'test-text', type: 'test', onClick: clickSpy };
  const component = shallow(
    <IrisButton {...props} />,
  );
  it('should render without crashing', function () {
    expect(component.exists()).toBe(true);
  });
  it('should be of the right type', function () {
    expect(component.find('.iris-button.test').length).toEqual(1);
  });
  it('should have the right text', function () {
    expect(component.text()).toEqual('test-text');
  });
  it('should fire the onClick when clicked', function () {
    component.find('button').simulate('click');
    expect(clickSpy.calledOnce).toBe(true);
  });
  it('should be disabled when told to be', function () {
    component.setProps(Object.assign({ disabled: true }, props));
    expect(component.find('button[disabled=true]').length).toEqual(1);
  });
});
