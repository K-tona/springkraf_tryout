import React, { useState, useEffect, useReducer } from "react";
import { useTheme } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";

import TabPanel from "./TabPanel";
import Quotation from "./Quotation";
import SingleField from "./SingleField";
import PaymentOption from "./PaymentOption";
import StepController from "./StepController";
import CurrenciesServices from "../../services/CurrenciesServices";

const initialState = {
  transferAmount: 0,
  senderName: "",
  recipientName: "",
  detail: "",
  payment: { isPoint: false, isFilled: false }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD_TRANSFER_AMOUNT":
      return { ...state, transferAmount: action.payload };
    case "SET_FIELD_SENDER":
      return { ...state, senderName: action.payload };
    case "SET_FIELD_RECIPIENT":
      return { ...state, recipientName: action.payload };
    case "SET_FIELD_DETAIL":
      return { ...state, detail: action.payload };
    case "SET_FIELD_PAYMENT":
      return { ...state, payment: action.payload };
    default:
      return state;
  }
};

export default function Main() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [currencies, setCurrencies] = useState([
    { label: "EUR", value: "EUR" }
  ]);
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const steps = ["Quotation", "Sender", "Recipient", "Detail", "Payment"];

  const handleChangeIndex = index => setActiveStep(index);

  const handleNext = () => {
    let enableNext = true;
    switch (activeStep) {
      case 1:
        if (!state.senderName) {
          enableNext = false;
          handleError("Please Fill in the sender's name");
        }
        break;
      case 2:
        if (!state.recipientName) {
          enableNext = false;
          handleError("Please Fill in the recipient's name");
        }
        break;
      case 4:
        console.log(state);
        if (!state.payment.isPoint && !state.payment.isFilled) {
          enableNext = false;
          handleError("Please Fill in your card information correctly");
        }
        break;
      default:
        break;
    }
    return enableNext && !state.error ? setActiveStep(activeStep + 1) : null;
  };
  const handleBack = () => {
    setError();
    setActiveStep(activeStep - 1);
  };
  const handleReset = () => setActiveStep(0);

  const handleError = err => setError(err);
  const handleQuoteInfoChange = value =>
    dispatch({ type: "SET_FIELD_TRANSFER_AMOUNT", payload: value });
  const handleChangeTextField = (type, value) =>
    dispatch({ type: `SET_FIELD_${type.toUpperCase()}`, payload: value });
  const handleChangePaymentDetail = value =>
    dispatch({ type: `SET_FIELD_PAYMENT`, payload: value });

  useEffect(() => {
    CurrenciesServices.GetCurrencies.then(res => setCurrencies(res)).catch(
      err => {
        console.log(err);
      }
    );
  }, []);

  return (
    <StepController
      steps={steps}
      activeStep={activeStep}
      onNext={handleNext}
      onBack={handleBack}
      onReset={handleReset}
      values={state}
      error={error}
    >
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={activeStep} index={0} dir={theme.direction}>
          <Quotation
            currencies={currencies}
            onChange={handleQuoteInfoChange}
            onError={handleError}
          />
        </TabPanel>
        <TabPanel value={activeStep} index={1} dir={theme.direction}>
          <SingleField
            type="Sender"
            title="Hi there !!"
            subtitle="Give us the sender's name here"
            required
            onChange={handleChangeTextField}
            onError={handleError}
          />
        </TabPanel>
        <TabPanel value={activeStep} index={2} dir={theme.direction}>
          <SingleField
            type="Recipient"
            title="Who are you transfering to"
            subtitle="Give us the recipient's name here"
            required
            onChange={handleChangeTextField}
            onError={handleError}
          />
        </TabPanel>
        <TabPanel value={activeStep} index={3} dir={theme.direction}>
          <SingleField
            type="Detail"
            title="Almost Done !!"
            subtitle="You can add note here if you want"
            onChange={handleChangeTextField}
          />
        </TabPanel>
        <TabPanel value={activeStep} index={4} dir={theme.direction}>
          <PaymentOption
            onChange={handleChangePaymentDetail}
            onError={handleError}
          />
        </TabPanel>
      </SwipeableViews>
    </StepController>
  );
}
