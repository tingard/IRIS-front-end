/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import IrisLoader from '../IrisLoader';

describe('<IrisAlert />', function () {
  const onDecrease = sinon.spy();
  const onIncrease = sinon.spy();
  const props = { onDecrease, onIncrease };
  const component = shallow(
    <IrisLoader {...props} />,
  );
  it('should render without crashing', function () {
    expect(component.exists()).toBe(true);
  });
  it('should have the correct id', function () {
    expect(component.find('#iris-loader-spinner').length).toEqual(1);
  });
});
