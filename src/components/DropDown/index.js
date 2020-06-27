import React, { useEffect, useReducer } from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import useStyles from "./styles";

const initialState = {
  value: "",
  label: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_LABEL":
      return { ...state, label: action.payload };
    case "SET_MENU_OBJECT":
      const { value, label } = action.payload;
      return { ...state, value, label };
    default:
      return state;
  }
};

const DropDown = props => {
  const { listmenu, onChange } = props;
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (listmenu.length > 0) {
      const { value, label } = listmenu[0];
      dispatch({ type: "SET_MENU_OBJECT", payload: { value, label } });
    }
  }, []);

  const handleChange = event => {
    const { value } = event.target;
    const { label } = listmenu.find(d => d.value === value);
    dispatch({ type: "SET_MENU_OBJECT", payload: { value, label } });
    onChange(value);
  };
  const renderValue = () => state.label;

  return (
    <>
      <FormControl variant="outlined">
        <Select
          className={classes.formControl}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          value={state.value}
          renderValue={renderValue}
        >
          {listmenu.length > 0 ? (
            listmenu.map(d => {
              return (
                <MenuItem value={d.value} key={d.value}>
                  {d.value}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default DropDown;
