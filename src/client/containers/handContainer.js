import { connect } from 'react-redux';
import Hand from '../components/Hand';

const mapStateToProps = state => ({
  submissions: state.submissions.toArray(), // TODO: filter and sort this
});

export default connect(mapStateToProps)(Hand);
