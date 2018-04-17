import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../commonResources/IrisButton';
import ImageDescription from '../../commonResources/imageDescription';
import IrisAlert from '../../commonResources/IrisAlert';

class AcceptDescriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 4,
      didError: false,
    };
    this.acceptDescription = this.acceptDescription.bind(this);
  }
  acceptDescription() {
    this.props.acceptDescription(this.ratingInput.value)
      .then(
        (m) => {
          console.log(m);
          if (m.error) {
            console.log(m.error.success);
            this.setState({ didError: !m.error.success });
          }
        },
      )
      .catch(
        e => console.warn('accepting description failed', e),
      );
  }
  render() {
    if (this.props.isFetching || this.props.message === null) {
      return <p>Loading...</p>;
    }
    let level;
    level = this.state.rating > 1 ? 'okay' : 'bad';
    level = this.state.rating > 3 ? 'good' : level;
    return (
      <div className="w3-container accept-description-page">
        <h1>Accept description</h1>
        <section role="group" className="w3-padding-16">
          <h2>Description</h2>
          <ImageDescription classification={this.props.message.get('classification')} />
        </section>
        <section role="group" aria-labelledby="w3-padding-16 accept-description-rating-header">
          <label htmlFor="rating-input">
            <h2 id="accept-description-rating-header">
              How would you rate this description?
            </h2>
            <select
              id="rating-input"
              ref={(r) => { this.ratingInput = r; }}
              className={`w3-input w3-border w3-margin-bottom select-style ${level}`}
              value={this.state.rating}
              onChange={e => this.setState({ rating: e.target.value })}
            >
              <option value="0">This didn't help at all</option>
              <option value="1">little helpful</option>
              <option value="2">Perfect, I got all the help I needed</option>
            </select>
          </label>
          <IrisButton
            text="Submit"
            onClick={this.acceptDescription}
          />
          <div role="alert">
            {this.state.didError ? <IrisAlert
              title="Whoops, something went wrong..."
              message="Please try again later!"
              type="warning"
              onClose={() => this.setState({ didError: false })}
            /> : null}
          </div>
        </section>
      </div>
    );
  }
}

AcceptDescriptionPage.propTypes = {
  isFetching: PropTypes.bool,
  message: ImmutablePropTypes.contains({
    classification: ImmutablePropTypes.contains({
      imageType: PropTypes.string,
    }),
  }),
  acceptDescription: PropTypes.func,
};

export default AcceptDescriptionPage;
