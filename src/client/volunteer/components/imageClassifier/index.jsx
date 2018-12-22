import React from 'react';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ImageTypeSelector from './imageTypeSelector';
import GraphClassifier from './graphClassifier';
import MiscClassifier from './miscClassifier';
import TableClassifier from './tableClassifier';
import '../../styles/classify-page.scss';

class ImageClassifier extends React.Component {
  constructor(props) {
    super(props);
    this.onComplete = this.onComplete.bind(this);
    this.state = {
      imageType: null,
    };
  }

  onComplete(details) {
    this.props.classifyImage({ imageType: this.state.imageType, details })
      .then(
        (res) => {
          console.log(res.success);
          this.props.push('/volunteer');
        },
      );
  }

  render() {
    switch (this.state.imageType) {
      case 'graph':
        return (
          <div className="classify-panel">
            <GraphClassifier
              onComplete={this.onComplete}
              onCancel={() => this.setState({ imageType: null })}
            />
          </div>
        );
      case 'table':
        return (
          <div className="classify-panel">
            <TableClassifier
              onComplete={this.onComplete}
              onCancel={() => this.setState({ imageType: null })}
            />
          </div>
        );
      case 'other':
        return (
          <div className="classify-panel">
            <MiscClassifier
              onComplete={this.onComplete}
              onCancel={() => this.setState({ imageType: null })}
            />
          </div>
        );
      default:
        return (
          <div className="classify-panel">
            <ImageTypeSelector
              onSelect={imageType => this.setState({ imageType })}
            />
          </div>
        );
    }
  }
}

ImageClassifier.propTypes = {
  classifyImage: PropTypes.func,
  push: PropTypes.func,
};

export default ImageClassifier;
