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
}));

export const App = () => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const classes = useStyles();

  useEffect(() => {
    fetchNotes();
  }, []);

  async function onChange(e) {
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
      <h1>My Recipes</h1>
      <Grid container className={classes.componentContainer} spacing={3}>
        <Grid item xs={12}>
          <input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Note name"
            value={formData.name}
          />
          <input
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Note description"
            value={formData.description}
          />
          <input type="file" onChange={onChange} />
          <button onClick={createNote}>Create Note</button>
        </Grid>
        {notes.map((note) => (
          <Grid item xs={3} key={note.id || note.name}>
            <Paper className={classes.paper}>
              <h2>{note.name}</h2>
              <p>{note.description}</p>
              <button onClick={() => deleteNote(note)}>Delete note</button>
              {note.image && <img src={note.image} style={{ width: 400 }} />}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
