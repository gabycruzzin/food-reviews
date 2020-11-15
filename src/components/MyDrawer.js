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
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
    display: "grid",
    [theme.breakpoints.down("sm")]: {
      margin: "36px auto",
      gridTemplateColumns: 300,
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      gridTemplateColumns: "90%",
    },
  },
  buttonColor: {
    backgroundColor: "#b00b01",
    margin: theme.spacing(1),
  },
  camera: { color: "#b00b01" },
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
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={onUpload}
      />
      <label htmlFor="icon-button-file" style={{ textAlign: "center" }}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          classes={{ colorPrimary: classes.camera }}
        >
          <PhotoCamera />
        </IconButton>
      </label>
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
  );
};
