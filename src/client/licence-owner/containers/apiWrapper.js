import { connect } from 'react-redux';
import ApiWrapper from '../components/ApiWrapper';
import {
  getUserDetails,
  getLicences,
  getImages,
  passSwRegistrationToAPI,
  subscribeToPushNotifications,
  handlePushMessage,
} from '../actions';

const mapStateToProps = state => ({
  user: state.user,
  images: state.images,
  licences: state.licences,
});

const mapDispatchToProps = dispatch => ({
  getLicences: () => dispatch(getLicences()),
  getUserDetails: () => dispatch(getUserDetails()),
  getImages: () => dispatch(getImages()),
  passSwRegistrationToAPI: swReg => dispatch(passSwRegistrationToAPI(swReg)),
  subscribeToPushNotifications: () => dispatch(subscribeToPushNotifications()),
  handlePushMessage: pushedMessage => dispatch(handlePushMessage(pushedMessage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiWrapper);
