import { connect } from 'react-redux';
import ClassifyPage from '../components/ClassifyPage';
import { sendMessage } from '../actions';


const mapStateToProps = (state, ownProps) => ({
  card: state.cards.get('cards').filter(
    c => c.get('_id') === ownProps.match.params.cardId,
  ).get(0),
  cardState: state.cards.get('state'),
  user: state.user,
  isFetching: state.user.get('isFetching') || state.cards.get('isFetching'),
});

const mapDispatchToProps = dispatch => ({
  sendMessage: m => dispatch(sendMessage(m)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassifyPage);
