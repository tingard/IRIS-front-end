import { connect } from 'react-redux';
import MainPage from '../components/MainPage';
import { getUserDetails, getMessages, getImages } from '../actions';

const mapStateToProps = state => ({
  cards: state.cards,
  user: state.user,
  messages: state.messages,
});

const mapDispatchToProps = dispatch => ({
  getUserDetails: () => dispatch(getUserDetails({ hi: 'there' })),
  getMessages: () => dispatch(getMessages()),
  getImages: () => dispatch(getImages()),
});


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
