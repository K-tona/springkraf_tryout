import React from "react";
import {
  Grid,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";
import PropTypes from "prop-types";

import useStyles from "./styles";

const StepController = props => {
  const {
    children,
    steps,
    activeStep,
    onNext,
    onBack,
    onReset,
    values,
    error
  } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item sm={8} md={6} lg={5}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {children}
        {error && (
          <Grid container spacing={2} className={classes.root}>
            <Typography className={classes.error}>{error}</Typography>
          </Grid>
        )}

        <Grid container spacing={2}>
          {activeStep === steps.length ? (
            <>
              <Grid item xs={12}>
                {Object.keys(values).map(d => {
                  return (
                    <Typography variant="h6" key={d}>
                      {`${d}: ${values[d]}`}
                    </Typography>
                  );
                })}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={onReset}
                >
                  Okay
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={onBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={onNext}
                  disabled={activeStep === steps.length}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

StepController.propTypes = {
  steps: PropTypes.array,
  activeStep: PropTypes.number,
  onNext: PropTypes.func,
  onBack: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  error: PropTypes.string
};

export default StepController;
