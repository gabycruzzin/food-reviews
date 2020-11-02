import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { createEmployee } from "../apis/queries";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
export const CreateEmployee = () => {
  const classes = useStyles();
  const [sid, setsid] = useState("");
  const [name, setname] = useState("");
  const [response, setresponse] = useState(null);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Create Employee
      </Typography>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="SID"
          variant="outlined"
          value={sid}
          onChange={(event) => setsid(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => setname(event.target.value)}
        />
      </form>

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          createEmployee(sid, name).then((res) => setresponse(res))
        }
      >
        Create
      </Button>

      <br />
      <br />

      {response && (
        <div>
          <Typography variant="button" display="block" gutterBottom>
            New Employee Created
          </Typography>
          <Typography variant="caption" gutterBottom>
            {response}
          </Typography>
        </div>
      )}
    </>
  );
};
