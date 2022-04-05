import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, onClick, disabled, testid } = this.props;
    return (
      <button
        type="button"
        onClick={ onClick }
        disabled={ disabled }
        data-testid={ testid }
      >
        { label }
      </button>
    );
  }
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  testid: PropTypes.string.isRequired,
};
