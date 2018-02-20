/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Select from 'react-select';

import FullPageSpinner from './FullPageSpinner';
import ImageCard from './ImageCard';
// import AlertHolder from './AlertHolder';

// TODO: query API for this?
const filters = {
  subject: [
    { value: 'any', label: 'Any students' },
    { value: 'physics', label: 'Physics students' },
    { value: 'biology', label: 'Biology students' },
    { value: 'chemistry', label: 'Chemistry students' },
    { value: 'maths', label: 'Maths students' },
    { value: 'computerScience', label: 'Computer Science students' },
  ],
  level: [
    { value: '4', label: 'Any level' },
    { value: '1', label: 'GCSE level' },
    { value: '2', label: 'A-level' },
    { value: '3', label: 'Degree level' },
  ],
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: 'any',
      selectedLevel: '4',
    };
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.handleSubjectChange = this.handleSubjectChange.bind(this);
  }
  handleLevelChange(val) {
    this.setState({ selectedLevel: val.value });
  }
  handleSubjectChange(val) {
    this.setState({ selectedSubject: val.value });
  }
  render() {
    if (this.props.cards.get('state').get('isFetching') || this.props.user.get('isFetching')) {
      return <FullPageSpinner />;
    }
    const cardListGood = this.props.cards.get('cards').filter(
      card => this.props.user.get('levels').get(card.get('subject')) > card.get('difficulty'),
    );
    const cardListBad = this.props.cards.get('cards').filter(
      card => this.props.user.get('levels').get(card.get('subject')) <= card.get('difficulty'),
    );
    const cardList = cardListGood.concat(cardListBad).filter(
      card => (
        this.state.selectedSubject === 'any' || card.get('subject') === this.state.selectedSubject
      ) && (
          parseFloat(this.state.selectedLevel) >= parseFloat(card.get('difficulty'))
        ),
    ).map(
      card => <ImageCard {...card.toObject()} key={card.get('_id')} user={this.props.user} />,
    );

    return (
      <div>
        <div className="main-page-topmessage">
          {/* TODO: alert holder here, tie visibility to state and pass function to hide */}
          <label htmlFor="subject-filter-dropdown">
            <p>I feel like helping</p>
            <Select
              name="subject-filter-dropdown"
              value={this.state.selectedSubject}
              onChange={this.handleSubjectChange}
              options={filters.subject}
            />
          </label>
          <label htmlFor="level-filter-dropdown">
            <p>at (or below)</p>
            <Select
              name="level-filter-dropdown"
              value={this.state.selectedLevel}
              onChange={this.handleLevelChange}
              options={filters.level}
            />
          </label>
        </div>
        <div className="cardHolder">
          {cardList.size > 0 ? cardList.toArray() : (
            <h4 className="w3-padding-32">Looks like there aren't any cards here!</h4>)}
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  cards: ImmutablePropTypes.contains({
    cards: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        subject: PropTypes.string,
        difficulty: PropTypes.number,
        key: PropTypes.string,
      }),
    ),
    state: ImmutablePropTypes.contains({
      isFetching: PropTypes.bool,
    }),
  }),
  user: ImmutablePropTypes.contains({
    level: ImmutablePropTypes.contains({
      physics: PropTypes.number,
      biology: PropTypes.number,
      chemistry: PropTypes.number,
      maths: PropTypes.number,
      computerScience: PropTypes.number,
    }),
    state: ImmutablePropTypes.contains({
      isFetching: PropTypes.bool,
    }),
  }),
};

export default HomePage;
