import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    width: "100%"
  },
  switch: {
    margin: 12
  },
  blackstrip: {
    width: "100%",
    height: 40,
    marginTop: 40,
    backgroundColor: "gray"
  },
  cardContent: {
    textAlign: "left",
    paddingBottom: 40
  },
  cardNumber: {
    width: 200
  },
  expDate: {
    width: 60
  }
});

export default useStyles;
