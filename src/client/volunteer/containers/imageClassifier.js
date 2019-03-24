import { connect } from 'react-redux';
import ImageClassifier from '../components/ImageClassifier';
import { replyImage } from '../actions';

const mapStateToProps = (state, ownProps) => ({
  push: ownProps.push,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  classifyImage: m => dispatch(
    replyImage(
      Object.assign({ imageId: ownProps.imageId }, m),
    ),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageClassifier);
