/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

class ImagePanel extends React.Component {
  constructor(props) {
    super(props);
    this.onPanStart = this.onPanStart.bind(this);
    this.onPanMove = this.onPanMove.bind(this);
    this.onPanEnd = this.onPanEnd.bind(this);
    this.onZoomStart = this.onZoomStart.bind(this);
    this.onZoomChange = this.onZoomChange.bind(this);
    this.onZoomEnd = this.onZoomEnd.bind(this);
    this.state = {
      zoom: 1,
      top: 0,
      left: 0,
      isTouching: false,
      touchDownPoint: [0, 0],
    };
  }
  onPanStart(e) {
    if (this.state.zoom !== 1) this.props.onImageMove();
    let touchDownPoint;
    if (typeof e.changedTouches !== 'undefined') {
      touchDownPoint = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    } else {
      touchDownPoint = [e.clientX, e.clientY];
    }
    this.setState({ isTouching: true, touchDownPoint });
    console.log(touchDownPoint);
    return false;
  }
  onPanMove(e) {
    e.preventDefault();
    if (this.state.isTouching) {
      let touchDownPoint;
      if (typeof e.changedTouches !== 'undefined') {
        touchDownPoint = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
      } else {
        touchDownPoint = [e.clientX, e.clientY];
      }
      const { left, top } = this.wrapPanToImageSize(
        this.state.left + (touchDownPoint[0] - this.state.touchDownPoint[0]),
        this.state.top + (touchDownPoint[1] - this.state.touchDownPoint[1]),
      );
      this.setState({ left, top, touchDownPoint });
    }
  }
  onPanEnd() {
    if (this.state.zoom !== 1) this.props.onImageDoneMoving();
    this.setState({ isTouching: false });
  }
  onZoomStart() {
    if (this.state.zoom !== 1) this.props.onImageMove();
  }
  onZoomChange(e) {
    const { left, top } = this.wrapPanToImageSize(this.state.left, this.state.top);
    this.setState({ left, top, zoom: e.target.value });
    return false;
  }
  onZoomEnd() {
    this.props.onImageDoneMoving();
    const { left, top } = this.wrapPanToImageSize(this.state.left, this.state.top);
    this.setState({ left, top });
    return false;
  }
  wrapPanToImageSize(proposedLeft, proposedTop) {
    if (this.state.zoom === 1) return { left: 0, top: 0 };
    const scalingConst = 0.5 * (this.state.zoom - 1);
    const left = Math.max(
      -this.image.clientWidth * scalingConst,
      Math.min(
        this.image.clientWidth * scalingConst,
        proposedLeft,
      ),
    );
    const top = Math.max(
      -this.image.clientHeight * scalingConst,
      Math.min(
        this.image.clientHeight * scalingConst,
        proposedTop,
      ),
    );
    return { left, top };
  }
  render() {
    return (
      <div className="image-panel">
        <div
          onTouchStart={this.onPanStart}
          onTouchMove={this.onPanMove}
          onTouchEnd={this.onPanEnd}
          onMouseDown={this.onPanStart}
          onMouseMove={this.onPanMove}
          onMouseUp={this.onPanEnd}
        >
          <img
            src={this.props.card.get('url')}
            ref={(r) => { this.image = r; }}
            alt="This is being described"
            style={{
              transform: `scale(${this.state.zoom})`,
              top: `${this.state.top}px`,
              left: `${this.state.left}px`,
            }}
            draggable="false"
          />
        </div>
        <input
          type="range"
          className="slider"
          min="1"
          max="3"
          step="0.1"
          value={this.state.zoom}
          onChange={this.onZoomChange}
          onTouchStart={this.onZoomStart}
          onTouchEnd={this.onZoomEnd}
        />
        <p>{this.props.card.get('question')}</p>
      </div>
    );
  }
}

ImagePanel.propTypes = {
  card: ImmutablePropTypes.contains({
    url: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
  }).isRequired,
  onImageMove: PropTypes.func.isRequired,
  onImageDoneMoving: PropTypes.func.isRequired,
};

export default ImagePanel;
