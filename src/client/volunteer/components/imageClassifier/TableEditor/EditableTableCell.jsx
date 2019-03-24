import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

class EditableTableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.editable = React.createRef();
    this.onKeyDown = this.onKeyDown.bind(this);
    this.navigationDirection = Map({
      13: [0, 1], // down
      40: [0, 1], // return
      37: [-1, 0], // left
      38: [0, -1], // up
      39: [1, 0], // right
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  componentDidUpdate() {
    if (this.props.focused) {
      this.editable.current.focus();
    }
  }

  onKeyDown(e) {
    const direction = this.navigationDirection.get(e.keyCode.toString(), false);
    if (direction !== false
      && (
        this.editable.current.selectionStart + direction[0] < 0
        || this.editable.current.selectionStart + direction[0] > this.state.value.length
        || direction[1] !== 0
      )
    ) {
      this.props.onNavigateOut(...direction);
    }
  }

  render() {
    return (
      <input
        ref={this.editable}
        tabIndex={-1}
        onChange={({ target: { value } }) => this.setState(
          { value },
          () => this.props.onChange(this.state.value),
        )}
        value={this.state.value}
        onMouseDown={this.props.onClick}
        onKeyDown={this.onKeyDown}
        onBlur={() => this.props.onChange(this.state.value)}
      />
    );
  }
}

EditableTableCell.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onNavigateOut: PropTypes.func,
  focused: PropTypes.bool,
};

EditableTableCell.defaultProps = {
  onNavigateOut: () => null,
  focused: false,
};
export default EditableTableCell;
