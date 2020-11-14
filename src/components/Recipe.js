import { Typography, Button, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

export const Recipe = ({ note, deleteNote }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={3} lg={3}>
      <Paper className={classes.paper}>
        <Typography variant="h4">{note.name}</Typography>
        <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
          {note.description}
        </Typography>
        {note.image && (
          <img
            src={note.image}
            alt=""
            style={{ width: "100%", height: "auto" }}
          />
        )}
        <Button
          variant="outlined"
          size="small"
          disableElevation
          onClick={() => deleteNote(note)}
        >
          Delete note
        </Button>
      </Paper>
    </Grid>
  );
};
