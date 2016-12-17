import { connect } from 'react-redux';
import ImageCard from '../components/ImageCard';

const mapStateToProps = (state, ownProps) => {
  console.log(state.submissions);
  const im = state.submissions.get(ownProps.subID);
  const usr = state.user;
  const d = {
    imageUrl: im.imageUrl,
    imageID: parseInt(ownProps.subID, 10),
    message: im.message,
    level: im.level,
    tag: im.tag,
    userLevel: usr.get('levels')[im.tag],
  };
  return d;
};

export default connect(mapStateToProps)(ImageCard);
