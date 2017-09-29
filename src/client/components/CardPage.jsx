import React from 'react';
import PropTypes from 'prop-types';
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
  }
  handleTemplateChange(val) {
    console.log(val.value);
    // update
    this.setState({ template: val.value });
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
                  style={{ backgroundImage: `url(${this.props.card.imageUrl})` }}
                  alt=""
                />
              </div>
            </div>
            <div className="w3-row" style={{ marginBottom: '10px' }}>
              <h5>Student asked:</h5>
              <div className="image-card-message">
                <p>
                  {this.props.card.message}
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
                <div
                  ref={(r) => { this.responseDiv = r; }}
                  className="card-panel-response-holder"
                  contentEditable
                />
                <button
                  className="submit-reply-button w3-button w3-border w3-round w3-right"
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
  card: PropTypes.object,
};

export default CardPage;
