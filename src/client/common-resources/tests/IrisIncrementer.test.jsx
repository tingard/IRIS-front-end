/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import IrisIncrementer from '../IrisIncrementer';

describe('<IrisAlert />', function () {
  const onDecrease = sinon.spy();
  const onIncrease = sinon.spy();
  const props = { onDecrease, onIncrease };
  const component = shallow(
    <IrisIncrementer {...props} />,
  );
  it('should render without crashing', function () {
    expect(component.exists()).toBe(true);
  });
  it('should have two buttons', function () {
    expect(component.find('button').length).toEqual(2);
  });
  it('should have one decreaser', function () {
    expect(component.find('.decrease').length).toEqual(1);
  });
  it('should have one increaser', function () {
    expect(component.find('.increase').length).toEqual(1);
  });
  it('should fire onDecrease when decreased', function () {
    component.find('button.decrease').simulate('click');
    expect(onDecrease.calledOnce).toBe(true);
  });
  it('should fire onIncrease when increased', function () {
    component.find('button.increase').simulate('click');
    expect(onIncrease.calledOnce).toBe(true);
  });
});
