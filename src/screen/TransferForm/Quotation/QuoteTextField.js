import React from "react";
import { TextField } from "@material-ui/core";

import useStyles from "./styles";
import PropTypes from "prop-types";

const QuoteTextField = props => {
  const classes = useStyles();
  const { type, onChange, value, label, disabled, ...others } = props;

  const handleChange = ev => {
    const onlyNums = ev.target.value.replace(/[^0-9]/g, "");

    onChange(type, onlyNums);
  };

  return (
    <TextField
      className={classes.fieldItem}
      id="outlined-password-input"
      label={label}
      type="text"
      variant="outlined"
      value={value}
      onChange={handleChange}
      disabled={disabled}
      {...others}
    />
  );
};

QuoteTextField.propTypes = {
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool
};

export default QuoteTextField;
