import { connect } from 'react-redux';
import ProfilePage from '../components/ProfilePage';

const mapStateToProps = state => state.user.toObject();


export default connect(mapStateToProps)(ProfilePage);
