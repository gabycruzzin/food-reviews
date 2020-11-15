import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Grid from "@material-ui/core/Grid";
import { Button, IconButton, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  input: {
    display: "none",
  },
  recipeContainer: {
    display: "grid",
    gridTemplateColumns: 300,
    [theme.breakpoints.down("sm")]: {
      margin: "36px auto",
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
    },
  },
  buttonColor: {
    backgroundColor: "#b00b01",
  },
  cameraColor: { color: "#b00b01" },
}));

export const MyDrawer = ({ setFormData, formData, onUpload, createNote }) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.recipeContainer}>
      <TextField
        id="outlined-basic"
        label="Name"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
      />
      <TextField
        id="standard-multiline-static"
        variant="outlined"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        label="Recipe"
        multiline
        rows={6}
        value={formData.description}
      />
      <Grid container justify="space-between">
        <div>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={onUpload}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              classes={{ colorPrimary: classes.cameraColor }}
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
        <Button
          onClick={createNote}
          variant="contained"
          color="primary"
          classes={{ containedPrimary: classes.buttonColor }}
          disableElevation
        >
          Create Note
        </Button>
      </Grid>
    </Grid>
  );
};
