import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect } from 'react-router-dom';
// import Select from 'react-select';
import ImageClassifier from '../containers/imageClassifier';

// const templateResponses = [
//   { value: 'none', label: 'None' },
//   { value: 'graph', label: 'Graph' },
//   { value: 'diagram', label: 'Diagram' },
//   { value: 'image', label: 'Photo' },
// ];
class CardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      template: 'none',
    };
  }
  render() {
    return this.props.card != null ? (
      <div className="w3-container">
        <div className="w3-row">
          <div className="w3-col l6">
            <div className="w3-row">
              <div className="w3-panel card-page-image-wrapper">
                <img src={this.props.card.get('url')} className="card-page-image" alt="this is being described" />
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
          <div className="w3-col l6">
            <div className="w3-card-4 card-panel-right-pane">
              <div className="w3-container">
                <ImageClassifier push={this.props.history.push} imageId={this.props.card.get('_id')} />
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
    _id: PropTypes.string,
    url: PropTypes.string,
    question: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default CardPage;
