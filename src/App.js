import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { IconButton } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { Review } from "./components/Review";
import { MyDrawer } from "./components/MyDrawer";
import { ReactComponent as Title } from "./imgs/title.svg";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

const initialFormState = {
  name: "",
  author: "",
  description: "",
  image: "",
  rating: 0,
};
const initialSnackState = { success: false, error: false };
const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      width: "calc(100% - 350px)",
    },
  },
  appBar: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: "transparent",
      color: "inherit",
    },
    top: "auto",
    bottom: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerStyle: {
    border: "none",
  },
  barColor: {
    [theme.breakpoints.down("sm")]: {
      backgroundColor: "#b00b01",
    },
  },
  title: {
    textAlign: "center",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const classes = useStyles();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(initialSnackState);

  const openSnackbar = (data) => {
    setSnackbar(data);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(initialSnackState);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
    if (
      !formData.name ||
      !formData.author ||
      !formData.description ||
      !formData.image ||
      !formData.rating
    ) {
      openSnackbar({ success: false, error: true });
      return;
    }
    await API.graphql({
      query: createNoteMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    openSnackbar({ success: true, error: false });
    fetchNotes();
    setNotes([...notes, formData]);
    setFormData(initialFormState);
    handleDrawerToggle();
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
      <AppBar
        position="fixed"
        className={classes.appBar}
        classes={{ colorPrimary: classes.barColor }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={"bottom"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <MyDrawer
              createNote={createNote}
              onUpload={onUpload}
              setFormData={setFormData}
              formData={formData}
            />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
              paperAnchorDockedRight: classes.drawerStyle,
            }}
            variant="permanent"
            anchor={"right"}
            open
          >
            <MyDrawer
              createNote={createNote}
              onUpload={onUpload}
              setFormData={setFormData}
              formData={formData}
            />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.title}>
          <Title style={{ width: "20em" }} />
        </div>
        <Grid container>
          {notes.map((note) => (
            <Review
              key={note.id || note.name}
              note={note}
              deleteNote={deleteNote}
            />
          ))}
        </Grid>
      </main>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.success}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Success!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.error}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning">
          Make sure to fill everything out and add a picture!
        </Alert>
      </Snackbar>
    </div>
  );
};
