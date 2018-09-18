import { connect } from 'react-redux';
import ApiWrapper from '../components/ApiWrapper';
import {
  getMessages,
  getUserDetails,
  getImages,
  passSwRegistrationToAPI,
  subscribeToPushNotifications,
} from '../actions';


const mapStateToProps = state => ({
  cards: state.cards,
  user: state.user,
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  getMessages: () => dispatch(getMessages()),
  getUserDetails: () => dispatch(getUserDetails()),
  getImages: () => dispatch(getImages()),
  passSwRegistrationToAPI: swReg => dispatch(passSwRegistrationToAPI(swReg)),
  subscribeToPushNotifications: () => dispatch(subscribeToPushNotifications()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiWrapper);
