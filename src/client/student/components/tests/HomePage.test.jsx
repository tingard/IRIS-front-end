/* eslint-disable prefer-arrow-callback, func-names */
import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../HomePage';
import { initialState as userState } from '../../reducers/userReducer';
import { initialState as messagesState } from '../../reducers/messagesReducer';
import { initialState as imagesState } from '../../reducers/imagesReducer';

describe('The Student HomePage', function () {
  let component;
  beforeEach(function () {
    component = shallow(
      <HomePage user={userState} messages={messagesState} images={imagesState} />,
    );
  });
  it('should render correctly', function () {
    expect(component.exists()).toBe(true);
  });
  it('should have one heading level 1', function () {
    expect(component.find('h1').length).toEqual(1);
  });
  describe('image upload form', function () {
    let uploadForm;
    beforeAll(function () {
      uploadForm = component.find('form');
    });
    it('should only exist once', function () {
      expect(uploadForm.length).toEqual(1);
    });
    it('should contain an image input', function () {
      expect(uploadForm.find('#imageInput').length).toEqual(1);
    });
    it('should contain a question input', function () {
      expect(uploadForm.find('#questionInput').length).toEqual(1);
    });
    it('should contain a note input', function () {
      expect(uploadForm.find('#noteInput').length).toEqual(1);
    });
    it('should contain a subject input', function () {
      expect(uploadForm.find('#subjectInput').length).toEqual(1);
    });
    it('should contain a difficulty input', function () {
      expect(uploadForm.find('#difficultyInput').length).toEqual(1);
    });
  });
  it('should have a submit button', function () {
    expect(component.find('#submitButton').length).toEqual(1);
  });
  it('should show the loading spinner when needed');
  it('should correctly display user information');
  it('should correctly create the image upload form data');
});
