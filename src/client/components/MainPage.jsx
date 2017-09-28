import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import ImageCard from './ImageCard';

const subjectOptions = [
  { value: 'any', label: 'Any image' },
  { value: 'physics', label: 'Physics images' },
  { value: 'biology', label: 'Biology images' },
  { value: 'chemistry', label: 'Chemistry images' },
  { value: 'maths', label: 'Maths images' },
  { value: 'computerScience', label: 'Computer Science images' },
];

const levelOptions = [
  { value: '4', label: 'Any level' },
  { value: '1', label: 'GCSE level' },
  { value: '2', label: 'A-level' },
  { value: '3', label: 'Degree level' },
];

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
    const cardList = this.props.cards.filter(
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
            <p>I feel like classifying</p>
            <Select
              name="subject-filter-dropdown"
              value={this.state.selectedSubject}
              onChange={this.handleSubjectChange}
              options={subjectOptions}
            />
          </label>
          <label htmlFor="level-filter-dropdown">
            <p>at</p>
            <Select
              name="level-filter-dropdown"
              value={this.state.selectedLevel}
              onChange={this.handleLevelChange}
              options={levelOptions}
            />
          </label>
        </div>
        <div className="cardHolder">{cardList}</div>
      </div>
    );
  }
}

MainPage.propTypes = {
  cards: PropTypes.array,
  user: PropTypes.object,
};

export default MainPage;
