/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import ImageCard from './ImageCard';

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

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSubject: 'any',
      selectedLevel: '3',
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
    const cardListGood = this.props.cards.filter(
      card => this.props.user.level[card.tag] >= card.level,
    );
    const cardListBad = this.props.cards.filter(
      card => this.props.user.level[card.tag] < card.level,
    );
    const cardList = cardListGood.concat(cardListBad).filter(
      card => (
        this.state.selectedSubject === 'any' || card.tag === this.state.selectedSubject
      ) && (
        parseFloat(this.state.selectedLevel) >= parseFloat(card.level)
      ),
    ).map(
      card => <ImageCard {...card} key={card.key} user={this.props.user} />,
    );
    return (
      <div>
        <div className="main-page-topmessage">
          <h3>Welcome back!</h3>
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
          {cardList.length > 0 ? cardList : (<h4>Looks like there we're all good here!</h4>)}
        </div>
      </div>
    );
  }
}

MainPage.propTypes = {
  cards: PropTypes.array,
  user: PropTypes.object,
};

export default MainPage;
