import { connect } from 'react-redux';
import ImageClassifier from '../components/imageClassifier';
// import { sendMessage } from '../actions';
import { replyImage } from '../actions';


const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  classifyImage: m => dispatch(
    replyImage(
      Object.assign(
        { imageId: ownProps.imageId },
        m,
      ),
    ),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageClassifier);
