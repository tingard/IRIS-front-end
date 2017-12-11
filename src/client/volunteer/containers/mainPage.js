import { connect } from 'react-redux';
import MainPage from '../components/MainPage';

const mapStateToProps = state => ({
  cards: state.cards.toArray(),
  user: state.user.toObject(),
});


export default connect(mapStateToProps)(MainPage);