import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Licence from './Licence';

class HomePage extends React.Component {
  componentDidMount() {
    console.log('mountie');
  }
  render() {
    return (
      <section className="w3-container grapheel-licencer-page">
        <h1>WelcomeBack, {this.props.name}</h1>
        <h2>Your Licences</h2>
        {this.props.licences.map(
          licence => <Licence key={licence.get('_id')} licence={licence} />,
        )}
      </section>
    );
  }
}

HomePage.propTypes = {
  name: PropTypes.string,
  licences: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      inUse: PropTypes.bool,
    }),
  ),
};

export default HomePage;
