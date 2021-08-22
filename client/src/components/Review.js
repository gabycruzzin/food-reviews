import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import { Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#b00b01",
  },
  squareContainer: {
    position: "relative",
    height: "15em",
    overflow: "hidden",
  },
  picture: {
    position: "absolute",
    maxWidth: "100%",
    width: "100%",
    height: "auto",
    top: "50%",
    left: "50%",
    transform: "translate( -50%, -50%)",
  },
}));

export const Review = ({ note, deleteNote }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

return (
    <Grid item xs={12} sm={6} md={6} lg={4} xl={3}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {note.author.charAt(0).toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={() => deleteNote(note)}>
              <DeleteIcon />
            </IconButton>
          }
          title={note.name}
          subheader={new Date(note.createdAt).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
        <CardMedia title={note.name} className={classes.squareContainer}>
          <img src={note.image} alt="" className={classes.picture} />
        </CardMedia>
        <CardActions disableSpacing>
          <div>
            <Typography
              variant="body2"
              color="textSecondary"
              component="legend"
            >
              {note.author}'s rating:
            </Typography>
            <Rating name="read-only" value={note.rating} readOnly />
          </div>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="Review"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph style={{ whiteSpace: "pre-line" }}>
              {note.description}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
)};
