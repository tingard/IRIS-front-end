import React from 'react';
import PropTypes from 'prop-types';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import ImageTypeSelector from './imageTypeSelector';
import GraphClassifier from './graphClassifier';
import MiscClassifier from './miscClassifier';
import TableClassifier from './tableClassifier';

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
          <GraphClassifier
            onComplete={this.onComplete}
            onCancel={() => this.setState({ imageType: null })}
          />
        );
      case 'table':
        return (
          <TableClassifier
            onComplete={this.onComplete}
            onCancel={() => this.setState({ imageType: null })}
          />
        );
      case 'other':
        return (
          <MiscClassifier
            onComplete={this.onComplete}
            onCancel={() => this.setState({ imageType: null })}
          />
        );
      default:
        return (
          <ImageTypeSelector
            onSelect={imageType => this.setState({ imageType })}
          />
        );
    }
  }
}

ImageClassifier.propTypes = {
  classifyImage: PropTypes.func,
  push: PropTypes.func,
};

export default ImageClassifier;
