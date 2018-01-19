import { connect } from 'react-redux';
import CardPage from '../components/CardPage';
import { sendMessage } from '../actions';


const mapStateToProps = (state, ownProps) => ({
  card: state.cards.get('cards').filter(
    c => c.get('id') === ownProps.match.params.cardId,
  ).get(0),
  cardState: state.cards.get('state'),
  user: state.user,
  isFetching: state.user.get('isFetching') || state.cards.get('isFetching'),
});

const mapDispatchToProps = dispatch => ({
  sendMessage: m => dispatch(sendMessage(m)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardPage);
