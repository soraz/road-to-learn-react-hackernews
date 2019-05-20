import React from "react";
import "./index.css";

import PropTypes from "prop-types";
const Button = ({ onClick, className = "", name, children }) => (
  <button
    onClick={onClick}
    className={className}
    data-index={name}
    name={name}
    type="button"
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Button;
