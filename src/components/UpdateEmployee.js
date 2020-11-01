import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "16ch",
    },
  },
}));
export const UpdateEmployee = (props) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Update Employee
      </Typography>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="ID" variant="outlined" />
        <TextField id="outlined-basic" label="SID" variant="outlined" />
        <TextField id="outlined-basic" label="Name" variant="outlined" />
      </form>

      <Button variant="contained" color="primary">
        Update
      </Button>
    </>
  );
};
