/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';

const IrisSelect = (props) => {
  let { id } = props;
  if (id === false) {
    id = Math.random();
  }
  const select = (
    <select
      id={`${id}-select`}
      className="iris-select"
      onChange={e => props.onChange(e.target.value)}
      value={props.value}
    >
      {props.options.map(
        (option, i) => <option key={i} value={option.value}>{option.text}</option>,
      )}
    </select>
  );
  if (!props.label) {
    return select;
  }
  return (
    <label htmlFor={`${id}-select`} className="w3-panel">
      {props.label}
      {select}
    </label>
  );
};

IrisSelect.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

IrisSelect.defaultProps = {
  id: false,
};

export default IrisSelect;
