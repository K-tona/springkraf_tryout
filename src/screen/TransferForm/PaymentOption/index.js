import React, { useState, useReducer, useEffect } from "react";
import {
  FormGroup,
  FormControlLabel,
  Switch,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
  TextField
} from "@material-ui/core";
import InputMask from "react-input-mask";
import PropTypes from "prop-types";

import useStyles from "./styles";

const initialState = {
  cardNumber: "",
  expDate: "",
  cardHolder: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CARD_NUMBER":
      return { ...state, cardNumber: action.payload };
    case "SET_EXP_DATE":
      return { ...state, expDate: action.payload };
    case "SET_CARD_HOLDER":
      return { ...state, cardHolder: action.payload };
    default:
      break;
  }
};

const PaymentOption = props => {
  const { onChange, onError } = props;
  const classes = useStyles();
  const [usePoint, setUsePoint] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { cardNumber, expDate, cardHolder } = state;
    if (cardNumber.length >= 16 && expDate.length >= 4 && cardHolder) {
      onChange({ isPoint: usePoint, ...state, isFilled: true });
    } else onChange({ isPoint: usePoint, ...state, isFilled: false });
  }, [state, usePoint]);

  const toggleUsePoint = () => {
    if (!usePoint) onError();
    setUsePoint(!usePoint);
  };
  const handleChangeNumber = ev => {
    dispatch({ type: "SET_CARD_NUMBER", payload: ev.target.value });
    if (!ev.target.value) onError("Please fill in Your Card Number");
  };
  const handleChangeExpDate = ev => {
    dispatch({ type: "SET_EXP_DATE", payload: ev.target.value });
    if (!ev.target.value) onError("Please fill in Your Card Exp. Date");
  };
  const handleChangeCardHolder = ev => {
    dispatch({
      type: "SET_CARD_HOLDER",
      payload: ev.target.value.toUpperCase()
    });
    if (!ev.target.value) onError("Please fill in Your Card Holder Name");
  };

  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={usePoint}
              onChange={toggleUsePoint}
              className={classes.switch}
            />
          }
          label="Do you want to use your point?"
        />
        {!usePoint ? (
          <Grid container>
            <Card variant="outlined" className={classes.card}>
              <Box className={classes.blackstrip} />
              <CardContent className={classes.cardContent}>
                <Grid item xs={12}>
                  <InputMask
                    mask="9999 9999 9999 9999"
                    value={state.cardNumber}
                    disabled={false}
                    onChange={handleChangeNumber}
                    maskChar=" "
                  >
                    {() => (
                      <TextField
                        className={classes.cardNumber}
                        placeholder="XXXX XXXX XXXX XXXX"
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12}>
                  <InputMask
                    mask="99/99"
                    maskPlaceholder="mm/yy"
                    value={state.expDate}
                    disabled={false}
                    maskChar=" "
                    onChange={handleChangeExpDate}
                  >
                    {() => (
                      <TextField
                        className={classes.expDate}
                        placeholder="MM/YY"
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={state.cardHolder}
                    variant="standard"
                    defaultValue="YOUR NAME"
                    onChange={handleChangeCardHolder}
                  />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          <Typography variant="h5">
            This transaction will cost you your point
          </Typography>
        )}
      </FormGroup>
    </>
  );
};

PaymentOption.propTypes = {
  onChange: PropTypes.func,
  onError: PropTypes.func
};

export default PaymentOption;
