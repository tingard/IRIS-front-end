import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../commonResources/IrisButton';
// import Modal from './Modal';

// TODO: Upload form should be a modal which users are guided through
// (with clearly labelled steps)

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.formShouldSubmit = this.formShouldSubmit.bind(this);
    this.checkIfInputsComplete = this.checkIfInputsComplete.bind(this);
    this.state = {
      successDialogActive: false,
      inputsAreComplete: false,
    };
  }
  checkIfInputsComplete() {
    this.setState({
      inputsAreComplete: (
        this.inputs.imageInput.files.length > 0 &&
        this.inputs.noteInput.value.length > 0 &&
        this.inputs.questionInput.value.length > 0
      ),
    });
  }
  formShouldSubmit(e) {
    e.preventDefault();
    const formData = new FormData();

    // image file input, chosen by user
    const data = {
      file: this.inputs.imageInput.files[0],
      question: this.inputs.questionInput.value,
      note: this.inputs.noteInput.value,
      difficulty: this.inputs.difficultyInput.value,
      subject: this.inputs.subjectInput.value,
    };
    if (data.question.length === 0) {
      alert('Please specify a question to ask');
    } else if (data.note.length === 0) {
      alert('Please specify a note so you can find this image later');
    } else {
      formData.append('irisImage', data.file);
      formData.append('question', data.question);
      formData.append('note', data.note);
      formData.append('difficulty', data.difficulty);
      formData.append('subject', data.subject);
      this.props.uploadImage(formData);
      this.setState({ successDialogActive: true }, this.props.getImages);
      this.inputs.imageInput.value = '';
      this.inputs.questionInput.value = '';
      this.inputs.noteInput.value = '';
      this.inputs.difficultyInput.value = 'maths';
      this.inputs.subjectInput.value = '0';
    }
    return false;
  }
  render() {
    if (
      (
        this.props.user.get('state').get('isFetching') &&
        this.props.user.get('state').get('isStale')
      ) || (
        this.props.messages.get('state').get('isFetching') &&
        this.props.messages.get('state').get('isStale')
      ) || (
        this.props.images.get('state').get('isFetching') &&
        this.props.images.get('state').get('isStale')
      )
    ) {
      return <div>Loading spinner</div>;
    }
    return (
      <div className="w3-container w3-animate-opacity iris-narrow-page">
        <h1 id="welcome-message">Welcome back, <span className="mf-disable">{this.props.user.get('name')}</span></h1>
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
                ref={(r) => { this.inputs.imageInput = r; }}
                className="w3-input w3-round w3-border"
                onChange={this.checkIfInputsComplete}
              />
            </label>
            <label htmlFor="questionInput" className="w3-panel">
              Specify a short question to ask volunteers
              <input
                type="text"
                name="question"
                id="questionInput"
                autoComplete="off"
                ref={(r) => { this.inputs.questionInput = r; }}
                className="w3-input w3-border w3-round"
                onChange={this.checkIfInputsComplete}
              />
            </label>
            <label htmlFor="noteInput" className="w3-panel">
              Add a note for yourself to identify this image
              <input
                type="text"
                name="note"
                id="noteInput"
                ref={(r) => { this.inputs.noteInput = r; }}
                className="w3-input w3-border w3-round"
                onChange={this.checkIfInputsComplete}
              />
            </label>
            <label htmlFor="subjectInput" className="w3-panel">
              What subject field is this image from?
              <select
                id="subjectInput"
                ref={(r) => { this.inputs.subjectInput = r; }}
                className="w3-input w3-border select-style"
              >
                <option value="maths">Maths</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
                <option value="computerScience">Computer Science</option>
                <option value="psychology">Psychology</option>
                <option value="finance">Finance</option>
              </select>
            </label>
            <label htmlFor="difficultyInput" className="w3-panel">
              What study level is this image?
              <select
                id="difficultyInput"
                ref={(r) => { this.inputs.difficultyInput = r; }}
                className="w3-input w3-border select-style"
              >
                <option value="0">GCSE level or below</option>
                <option value="1">A-level</option>
                <option value="2">Degree Level</option>
              </select>
            </label>
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
