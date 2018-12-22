/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../common-resources/IrisButton';
import IrisSelect from '../../common-resources/IrisSelect';
import IrisLoader from '../../common-resources/IrisLoader';
import '../../common-resources/_IrisInput.scss';

// TODO: Upload form should be a modal which users are guided through
// (with clearly labelled steps)

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.formShouldSubmit = this.formShouldSubmit.bind(this);
    this.checkIfInputsComplete = this.checkIfInputsComplete.bind(this);
    this.state = {
      successDialogActive: false,
      inputsAreComplete: false,
      question: '',
      note: '',
      subject: 'maths',
      file: null,
      difficulty: '0',
    };
  }

  checkIfInputsComplete() {
    this.setState(oldState => ({
      inputsAreComplete: (
        oldState.file !== null
        && oldState.note.length > 0
        && oldState.question.length > 0
      ),
    }));
  }

  formShouldSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // image file input, chosen by user
    const data = {
      question: this.state.question,
      note: this.state.note,
      difficulty: this.state.difficulty,
      subject: this.state.subject,
    };
    console.log(data);
    Object.entries(data).forEach(entry => formData.set(entry[0], entry[1]));
    formData.append('irisImage', this.state.file, this.state.file.name);
    console.log(formData);
    this.props.uploadImage(formData);
    this.setState(
      {
        successDialogActive: true,
        inputsAreComplete: false,
        question: '',
        note: '',
        subject: 'maths',
        file: null,
      },
      this.props.getImages,
    );
    return false;
  }

  render() {
    if (
      (
        this.props.user.get('state').get('isFetching')
        && this.props.user.get('state').get('isStale')
      ) || (
        this.props.messages.get('state').get('isFetching')
        && this.props.messages.get('state').get('isStale')
      ) || (
        this.props.images.get('state').get('isFetching')
        && this.props.images.get('state').get('isStale')
      )
    ) {
      return <IrisLoader />;
    }
    return (
      <div className="w3-container w3-animate-opacity iris-narrow-page">
        <h1 id="welcome-message" className="mf-disable">{`Welcome back, ${this.props.user.get('name')}`}</h1>
        <section
          className="w3-padding-16"
          role="form"
          aria-labelledby="upload-image-section-header"
        >
          <h3 id="upload-image-section-header">Upload an Image:</h3>
          <form
            onSubmit={(e) => { e.preventDefault(); return false; }}
          >
            <label htmlFor="imageInput" className="w3-panel">
              Select image to upload
              <input
                type="file"
                name="image"
                accept="image/*"
                id="imageInput"
                className="iris-input iris-input__full-width"
                onChange={e => this.setState(
                  { file: e.target.files.length > 0 ? e.target.files[0] : null },
                  this.checkIfInputsComplete,
                )}
              />
            </label>
            <label htmlFor="questionInput" className="w3-panel">
              Specify a short question to ask volunteers
              <input
                type="text"
                name="question"
                id="questionInput"
                autoComplete="off"
                className="iris-input iris-input__full-width"
                value={this.state.question}
                onChange={e => this.setState(
                  { question: e.target.value },
                  this.checkIfInputsComplete)
                }
              />
            </label>
            <label htmlFor="noteInput" className="w3-panel">
              Add a note for yourself to identify this image
              <input
                type="text"
                name="note"
                id="noteInput"
                className="iris-input iris-input__full-width"
                value={this.state.note}
                onChange={e => this.setState(
                  { note: e.target.value },
                  this.checkIfInputsComplete)
                }
              />
            </label>
            <IrisSelect
              id="subjectInput"
              label="What subject field is this image from?"
              options={[
                { value: 'maths', text: 'Maths' },
                { value: 'physics', text: 'Physics' },
                { value: 'chemistry', text: 'Chemistry' },
                { value: 'biology', text: 'Biology' },
                { value: 'computerScience', text: 'Computer Science' },
                { value: 'psychology', text: 'Psychology' },
                { value: 'finance', text: 'Finance' },
              ]}
              value={this.state.subject}
              onChange={val => this.setState({ subject: val })}
            />
            <IrisSelect
              id="difficultyInput"
              label="What study level is this image?"
              options={[
                { value: '0', text: 'GCSE level or below' },
                { value: '1', text: 'A-level' },
                { value: '2', text: 'Degree Level' },
              ]}
              value={this.state.difficulty}
              onChange={val => this.setState({ difficulty: val })}
            />
          </form>
          <div>
            <p>
              {!this.state.inputsAreComplete ? 'Not all fields are filled in!' : null}
            </p>
          </div>
          <IrisButton
            type="primary"
            id="submitButton"
            onClick={this.formShouldSubmit}
            disabled={!this.state.inputsAreComplete}
            text="Submit image"
          />
          <div role="alert">
            {this.state.successDialogActive ? (
              <div
                className="w3-panel w3-round w3-card-4 w3-display-container"
                role="group"
                aria-labelledby="upload-image-success-header"
                aria-atomic="true"
              >
                <h3 id="upload-image-success-header">Successfully uploaded image</h3>
                <p>Image has been successfully uploaded to IRIS</p>
                <button
                  onClick={() => this.setState({ successDialogActive: false })}
                  className="w3-button w3-display-topright"
                  aria-label="Close this message"
                  type="button"
                >
                  &times;
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {
  user: ImmutablePropTypes.contains({
    name: PropTypes.string,
    isStale: PropTypes.bool,
    isFetching: PropTypes.bool,
  }),
  messages: ImmutablePropTypes.contains({
    isStale: PropTypes.bool,
    isFetching: PropTypes.bool,
  }),
  images: ImmutablePropTypes.contains({
    isStale: PropTypes.bool,
    isFetching: PropTypes.bool,
  }),
  uploadImage: PropTypes.func,
  getImages: PropTypes.func,
};

export default HomePage;
