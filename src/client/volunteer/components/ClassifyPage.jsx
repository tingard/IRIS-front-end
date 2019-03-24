import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Redirect } from 'react-router-dom';
// import Select from 'react-select';
import Swipeable from 'react-swipeable';
import ImagePanel from './ImagePanel';
import ImageClassifier from '../containers/imageClassifier';

class ClassifyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showClassifierPanel: false,
      preventPanelSwitching: false,
    };
  }

  render() {
    if (!this.props.card) {
      return <Redirect to="/volunteer" />;
    }
    return (
      <Swipeable
        onSwipedLeft={() => (
          this.state.preventPanelSwitching ? null
            : this.setState({ showClassifierPanel: true })
        )}
        onSwipedRight={() => (
          this.state.preventPanelSwitching ? null
            : this.setState({ showClassifierPanel: false })
        )}
      >
        <div className="classify-page-wrapper">
          <div className={`classify-page ${this.state.showClassifierPanel ? 'right' : ''}`}>
            <ImagePanel
              onImageMove={() => this.setState({ preventPanelSwitching: true })}
              onImageDoneMoving={() => this.setState({ preventPanelSwitching: false })}
              card={this.props.card}
            />
            <ImageClassifier
              push={this.props.history.push}
              imageId={this.props.card.get('_id')}
            />
          </div>
          <div className="swipe-instruction">
            <p data-direction={this.state.showClassifierPanel ? '>>>' : '<<<'}>
              Swipe {this.state.showClassifierPanel ? 'left ' : 'right '}
              to {this.state.showClassifierPanel ? 'see the image' : 'describe this image'}
            </p>
          </div>
        </div>
      </Swipeable>
    );
  }
}

ClassifyPage.propTypes = {
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

export default ClassifyPage;
