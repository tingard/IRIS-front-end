import React from 'react';
import PropTypes from 'prop-types';

// TODO: replace with actual API
// const api = {
//   imageUploadAction: '/',
//   imageUploadMethod: 'post',
// };

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.inputs = {};
    this.formShouldSubmit = this.formShouldSubmit.bind(this);
  }
  formShouldSubmit(e) {
    e.preventDefault();
    const data = {
      file: this.inputs.imageInput.files[0],
      question: this.inputs.questionInput.value,
      note: this.inputs.noteInput.value,
    };
    if (data.question.length === 0) {
      alert('Please specify a question to ask');
    } else if (data.note.length === 0) {
      alert('Please specify a note so you can find this image later');
    } else {
      // send the request?
    }
    console.log(data);
    return false;
  }
  render() {
    return (
      <div className="w3-container w3-animate-opacity">
        <h1>Welcome back, {this.props.user.uname}</h1>
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
  user: PropTypes.shape({
    uname: PropTypes.string,
  }),
};
export default HomePage;
