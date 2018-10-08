/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import IrisSelect from '../IrisSelect';

describe('<IrisSelect />', function () {
  const onChange = sinon.spy();
  const options = [
    { value: '0', text: 'value-0' },
    { value: '1', text: 'value-1' },
  ];
  const props = {
    id: 'test-id',
    label: 'test-label',
    value: '0',
    options,
    onChange,
  };
  const component = shallow(
    <IrisSelect {...props} />,
  );
  it('should render without crashing', function () {
    expect(component.exists()).toBe(true);
  });
  it('should have the correct label', function () {
    expect(component.find('.iris-select-label').text()).toEqual(props.label);
  });
  it('should have the correct value');
  it('should have the correct options available');
  it('should call onChange once when it is changed', function () {
    component.find('select').simulate('change', { target: { value: '1' } });
    expect(onChange.calledOnce).toEqual(true);
  });
});
