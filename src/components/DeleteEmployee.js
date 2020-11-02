import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { deleteEmployee } from "../apis/queries";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
export const DeleteEmployee = () => {
  const classes = useStyles();
  const [id, setid] = useState("");
  const [response, setresponse] = useState(null);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Delete Employee
      </Typography>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={id}
          onChange={(event) => setid(event.target.value)}
        />
      </form>

      <Button
        variant="contained"
        color="primary"
        onClick={() => deleteEmployee(id).then((res) => setresponse(res))}
      >
        Delete
      </Button>

      <br />
      <br />

      {response && (
        <div>
          <Typography variant="button" display="block" gutterBottom>
            Employee Deleted
          </Typography>
          <Typography variant="caption" gutterBottom>
            {response}
          </Typography>
        </div>
      )}
    </>
  );
};
