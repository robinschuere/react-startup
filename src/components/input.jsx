import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  label, type, id, value, handleChange,
}) => (
  <div className="form-group">
    <label htmlFor={id}>
      {label}
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={handleChange}
        required
      />
    </label>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
