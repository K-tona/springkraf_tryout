import React from "react";
import DropDown from "../../../components/DropDown";
import PropTypes from "prop-types";

const QuoteDropdown = props => {
  const { currencies } = props;
  const { type, onChange } = props;

  const handleChange = value => {
    onChange(type, value);
  };

  return <DropDown listmenu={currencies} onChange={handleChange} />;
};

QuoteDropdown.propTypes = {
  currencies: PropTypes.array
};

export default QuoteDropdown;
