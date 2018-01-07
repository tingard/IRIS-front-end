import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// TODO: Upload form should be a modal which users are guided through
// (with clearly labelled steps)

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.formShouldSubmit = this.formShouldSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.user.get('isStale')) {
      this.props.getUserDetails();
    }
    if (this.props.messages.get('isStale')) {
      this.props.getMessages();
    }
    if (this.props.images.get('isStale')) {
      this.props.getImages();
    }
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
    }
    return false;
  }
  render() {
    if (
      this.props.user.get('isFetching') ||
      this.props.messages.get('isFetching') ||
      this.props.images.get('isFetching')
    ) {
      return <div>Loading spinner</div>;
    }
    return (
      <div className="w3-container w3-animate-opacity">
        <h1>Welcome back, {this.props.user.get('firstName')}</h1>
        <section>
          <h3>Upload an Image:</h3>
          <form
            onSubmit={this.formShouldSubmit}
          >
            <label htmlFor="imageInput" className="w3-panel">
              Select image to upload
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              id="imageInput"
              ref={(r) => { this.inputs.imageInput = r; }}
              className="w3-input"
            />
            <label htmlFor="questionInput" className="w3-panel">
              Specify a short question to ask volunteers
            </label>
            <input
              type="text"
              name="question"
              id="questionInput"
              ref={(r) => { this.inputs.questionInput = r; }}
              className="w3-input w3-border"
            />
            <label htmlFor="noteInput" className="w3-panel">
              Add a note for yourself to identify this image
            </label>
            <input
              type="text"
              name="note"
              id="noteInput"
              ref={(r) => { this.inputs.noteInput = r; }}
              className="w3-input w3-border"
            />
            <label htmlFor="subjectInput" className="w3-panel">
              What subject field is this image from?
            </label>
            <select
              id="subjectInput"
              ref={(r) => { this.inputs.subjectInput = r; }}
              className="w3-input w3-border"
            >
              <option value="maths">Maths</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="computer-science">Computer Science</option>
            </select>
            <label htmlFor="difficultyInput" className="w3-panel">
              What study level is this image?
            </label>
            <select
              id="difficultyInput"
              ref={(r) => { this.inputs.difficultyInput = r; }}
              className="w3-input w3-border"
            >
              <option value="0">GCSE level or below</option>
              <option value="1">A-level</option>
              <option value="2">Degree Level</option>
            </select>
            <button
              className="w3-button w3-green w3-panel"
              ref={(r) => { this.submitBtn = r; }}
              type="submit"
            >
              Submit image
            </button>
          </form>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {
  user: ImmutablePropTypes.contains({
    firstName: PropTypes.string,
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
  getUserDetails: PropTypes.func,
  getMessages: PropTypes.func,
  getImages: PropTypes.func,
  uploadImage: PropTypes.func,
};
export default HomePage;
