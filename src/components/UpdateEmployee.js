import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { updateEmployee } from "../apis/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "16ch",
    },
  },
}));
export const UpdateEmployee = () => {
  const classes = useStyles();
  const [id, setid] = useState("");
  const [sid, setsid] = useState("");
  const [name, setname] = useState("");
  const [response, setresponse] = useState(null);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Update Employee
      </Typography>

      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="ID"
          variant="outlined"
          value={id}
          onChange={(event) => setid(event.target.value)}
        />
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
          updateEmployee(id, sid, name).then((res) => setresponse(res))
        }
      >
        Update
      </Button>

      <br />
      <br />

      {response && (
        <div>
          <Typography variant="button" display="block" gutterBottom>
            Employee Updated
          </Typography>
          <Typography variant="caption" gutterBottom>
            {response}
          </Typography>
        </div>
      )}
    </>
  );
};
