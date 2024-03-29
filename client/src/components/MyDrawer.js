import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import {
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";

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
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
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

  return (
    <Grid container justifyContent="center" className={classes.recipeContainer}>
      <TextField
        label="Restaurant"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
      />
      <TextField
        label="Author"
        variant="outlined"
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        value={formData.author}
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
      <Typography
        variant="body2"
        color="textSecondary"
        className={classes.autoMargin}
      >
        {formData.image}
      </Typography>
      <Box
        component="fieldset"
        borderColor="transparent"
        className={classes.flexContainer}
      >
        <Rating
          className={classes.autoMargin}
          name="simple-controlled"
          value={formData.rating}
          onChange={(event, newValue) => {
            setFormData({ ...formData, rating: newValue });
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
