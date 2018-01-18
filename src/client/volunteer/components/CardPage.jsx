import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect } from 'react-router-dom';
import Select from 'react-select';

const templateResponses = [
  { value: 'none', label: 'None' },
  { value: 'graph', label: 'Graph' },
  { value: 'diagram', label: 'Diagram' },
  { value: 'image', label: 'Photo' },
];
class CardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: 'none',
    };
    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  handleTemplateChange(val) {
    this.setState({ template: val.value });
  }
  sendMessage() {
    this.props.sendMessage({
      imageId: this.props.card.get('id'),
      message: this.textarea.value,
    });
  }
  render() {
    return this.props.card != null ? (
      <div className="w3-container">
        <div className="w3-row">
          <div className="w3-col m6">
            <div className="w3-row">
              <div className="w3-panel card-page-image-wrapper">
                <div
                  className="card-page-image"
                  style={{ backgroundImage: `url(${this.props.card.get('url')})` }}
                  alt=""
                />
              </div>
            </div>
            <div className="w3-row" style={{ marginBottom: '10px' }}>
              <h5>Student asked:</h5>
              <div className="image-card-message">
                <p>
                  {this.props.card.get('question')}
                </p>
              </div>
            </div>
          </div>
          <div className="w3-col m6">
            <div className="w3-card-4">
              <div className="w3-container card-panel-right-pane">
                <h3>Reply:</h3>
                <p>Templates:</p>
                <Select
                  name="template-chooser-dropdown"
                  value={this.state.template}
                  onChange={this.handleTemplateChange}
                  options={templateResponses}
                />
                <textarea
                  ref={(r) => { this.textarea = r; }}
                  className="card-panel-response-holder"
                  rows={10}
                  style={{ resize: 'none' }}
                  autoFocus
                  required
                />
                <button
                  className="submit-reply-button w3-button w3-border w3-round w3-right"
                  onClick={this.sendMessage}
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

CardPage.propTypes = {
  // user: PropTypes.object,
  card: ImmutablePropTypes.contains({
    id: PropTypes.string,
    url: PropTypes.string,
    question: PropTypes.string,
  }),
  sendMessage: PropTypes.func,
};

export default CardPage;
