/* eslint prefer-arrow-callback: 0, func-names: 0, 'react/jsx-boolean-value': ['error', 'always'], 'react/jsx-filename-extension': 0 */
/* global describe, it, beforeEach */
import { mount } from 'enzyme';
import React from 'react';
import assert from 'assert';
import App from './App'

describe('App', function () {
  let wrapper;

  beforeEach(function () {
    wrapper = mount(<App />);
  });

  it('should render without crashing', function () {});
});
