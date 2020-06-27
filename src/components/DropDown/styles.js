import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2)
  },
  formControl: {
    width: 100
  },
  fieldItem: {
    height: "100%"
  },
  SelectView: {
    display: "none"
  }
}));

export default useStyles;
