import React, { useState } from "react";
import { Typography, Button, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}));

export const Recipe = ({ note, deleteNote }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Grid item xs={12} sm={12} md={12} lg={6}>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper className={classes.paper}>
              <Typography variant="h4">{note.name}</Typography>
              <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
                {note.description}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                disableElevation
                onClick={() => deleteNote(note)}
              >
                Delete note
              </Button>
            </Paper>
          </Fade>
        )}
      </Popper>
      <div className={classes.paper}>
        {note.image && (
          <a onClick={handleClick("top")}>
            <img
              src={note.image}
              alt=""
              style={{ width: "100%", height: "auto" }}
            />
          </a>
        )}
      </div>
    </Grid>
  );
};
