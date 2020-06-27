import React, { useState } from "react";
import { TextField, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";

const SingleField = props => {
  const { title, subtitle, type, required, onChange, onError } = props;
  const [state, setState] = useState();
  const classes = useStyles();

  const handleChange = ev => {
    setState(ev.target.value);
    if (typeof onError === "function") {
      if (!ev.target.value) onError(`Please fill in the ${type}'s name !!`);
      else onError();
    }
    onChange(type, ev.target.value);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="subtitle1">{subtitle}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          value={state}
          required={required}
          id="standard-required"
          label={`${type}'s name`}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

SingleField.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool
};

export default SingleField;
