import { CreateEmployee } from "./components/CreateEmployee";
import { UpdateEmployee } from "./components/UpdateEmployee";
import { DeleteEmployee } from "./components/DeleteEmployee";
import { ViewEmployee } from "./components/ViewEmployee";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      height: "100vh",
    },
    componentContainer: {
      margin: "auto",
      width: 1080,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.componentContainer} spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CreateEmployee />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <UpdateEmployee />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <DeleteEmployee />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <ViewEmployee />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
