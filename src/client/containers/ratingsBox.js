import { connect } from 'react-redux';
import RatingsBox from '../components/RatingsBox';

const mapStateToProps = (state) => {
  console.log(state);
  return ({
    updates: state.ratings.toArray(),
  });
};

export default connect(mapStateToProps)(RatingsBox);
