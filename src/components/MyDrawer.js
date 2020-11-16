import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import { Box, Button, IconButton, TextField } from "@material-ui/core";

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
  flexContainer: {
    textAlign: "center",
    display: "flex",
  },
  autoMargin: { margin: "auto" },
}));

export const MyDrawer = ({ setFormData, formData, onUpload, createNote }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <Grid container justify="center" className={classes.recipeContainer}>
      <TextField
        id="outlined-basic"
        label="Restaurant"
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
        label="Review"
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
      <label htmlFor="icon-button-file" className={classes.flexContainer}>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          classes={{ colorPrimary: classes.camera }}
          className={classes.autoMargin}
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <Box
        component="fieldset"
        borderColor="transparent"
        className={classes.flexContainer}
      >
        <Rating
          className={classes.autoMargin}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      <Button
        onClick={createNote}
        variant="contained"
        color="primary"
        classes={{ containedPrimary: classes.buttonColor }}
        disableElevation
      >
        Add Review
      </Button>
    </Grid>
  );
};
