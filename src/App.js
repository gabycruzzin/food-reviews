import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const initialFormState = { name: "", description: "" };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  componentContainer: {
    width: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  input: {
    display: "none",
  },
}));

export const App = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const classes = useStyles();

  useEffect(() => {
    fetchNotes();
  }, []);

  async function onUpload(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const image = await Storage.get(note.image);
          note.image = image;
        }
        return note;
      })
    );
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([...notes, formData]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter((note) => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        My Recipes
      </Typography>
      <Grid container className={classes.componentContainer} spacing={3}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={note.id || note.name}>
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
        ))}
      </Grid>
      <Grid
        container
        justify="center"
        className={classes.componentContainer}
        spacing={3}
      >
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
          />
          <br />
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
          <br />
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
            >
              <PhotoCamera />
            </IconButton>
          </label>
          <Button
            onClick={createNote}
            variant="contained"
            color="primary"
            disableElevation
          >
            Create Note
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
