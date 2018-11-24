/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import './_IrisSelect.scss';

const IrisSelect = ({
  id, options, label, value, onChange,
}) => {
  const idString = `${id === false ? Math.random() : id}-select`;
  const select = (
    <select
      id={idString}
      className="iris-select"
      onChange={e => onChange(e.target.value)}
      value={value}
    >
      {options.map(
        (option, i) => <option key={i} value={option.value}>{option.text}</option>,
      )}
    </select>
  );
  if (!label) {
    return select;
  }
  return (
    <label htmlFor={idString} className="w3-panel">
      <span className="iris-select-label">{label}</span>
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
