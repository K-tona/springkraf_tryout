import React, { useReducer, useEffect } from "react";
import { Box } from "@material-ui/core";
import PropTypes from "prop-types";
import useStyles from "./styles";

import QuoteDropdown from "./QuoteDropdown";
import QuoteTextField from "./QuoteTextField";
import useDebounce from "../../../hooks/useDebounce";
import CurrenciesServices from "../../../services/CurrenciesServices";

const initialState = {
  srcCurrency: "EUR",
  endCurrency: "EUR",
  srcValue: "1",
  endValue: "1"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SOURCE_CURRENCY":
      return { ...state, srcCurrency: action.payload };
    case "SET_END_CURRENCY":
      return { ...state, endCurrency: action.payload };
    case "SET_SOURCE_VALUE":
      return { ...state, srcValue: action.payload };
    case "SET_END_VALUE":
      return { ...state, endValue: action.payload };
    default:
      break;
  }
};

const Quotation = props => {
  const { currencies, onChange, onError } = props;
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  const srcDebounceValue = useDebounce(state.srcValue);

  useEffect(() => {
    const curValue = state.srcValue ? parseInt(state.srcValue) : 0;
    CurrenciesServices.GetCurrenciesRates(
      state.srcCurrency,
      state.endCurrency
    ).then(res_rate => {
      if (res_rate) {
        dispatch({
          type: "SET_END_VALUE",
          payload: `${curValue * res_rate}`
        });
        onChange(`${curValue * res_rate}`);
      } else onError("You can't transfer zero amount");
    });
  }, [srcDebounceValue, state.srcCurrency, state.endCurrency]);

  const handleChangeDropdown = (type, value) =>
    dispatch({ type: `SET_${type}_CURRENCY`, payload: value });

  const handleChangeText = (type, value) => {
    dispatch({ type: `SET_${type}_VALUE`, payload: value });
    if (!value) onError("You can't transfer zero amount");
    if (value) onError();
  };

  return (
    <>
      <Box className={classes.fieldRow}>
        <QuoteTextField
          type="SOURCE"
          label="You send"
          onChange={handleChangeText}
          value={state.srcValue}
          error={!state.srcValue}
        />
        <QuoteDropdown
          type="SOURCE"
          onChange={handleChangeDropdown}
          currencies={currencies}
        />
      </Box>
      <Box className={classes.fieldRow}>
        <QuoteTextField
          type="END"
          label="Recipient gets"
          onChange={handleChangeText}
          value={state.endValue}
          disabled
        />
        <QuoteDropdown
          type="END"
          onChange={handleChangeDropdown}
          currencies={currencies}
        />
      </Box>
    </>
  );
};

Quotation.propTypes = {
  currencies: PropTypes.array,
  onChange: PropTypes.func,
  onError: PropTypes.func
};

export default Quotation;
