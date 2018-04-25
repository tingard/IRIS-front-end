import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import IrisButton from '../../common-resources/IrisButton';
import ImageDescription from '../../common-resources/imageDescription';
import IrisAlert from '../../common-resources/IrisAlert';
import ratingValues from '../../common-resources/ratingValues';

class AcceptDescriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      didError: false,
    };
    this.acceptDescription = this.acceptDescription.bind(this);
  }
  acceptDescription() {
    this.props.acceptDescription(this.ratingInput.value)
      .then(
        (m) => {
          console.log(m);
          if (m.error && !m.error.success) {
            this.setState({ didError: !m.error.success });
            return m;
          }
          this.props.history.push(`/images/descriptions/${this.props.message.get('image').get('_id')}`);
          return m;
        },
      )
      .catch(
        e => ((console.warn('accepting description failed', e), Promise.reject(e))),
      );
  }
  render() {
    if (this.props.isFetching || this.props.message === null) {
      return <p>Loading...</p>;
    }
    let level;
    level = this.state.rating > 0 ? 'okay' : 'bad';
    level = this.state.rating > 1 ? 'good' : level;
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
              {ratingValues.map(
                rating => (
                  <option key={`rating-${rating.value}`} value={rating.value}>
                    {rating.text}
                  </option>
                ),
              )}
            </select>
          </label>
          <IrisButton
            text="Submit"
            onClick={this.acceptDescription}
          />
          {this.state.didError ? <IrisAlert
            title="Whoops, something went wrong..."
            message="Please try again later!"
            type="warning"
            onClose={() => this.setState({ didError: false })}
          /> : null}
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  acceptDescription: PropTypes.func,
};

export default AcceptDescriptionPage;
