import React from "react";
import { useHistory } from "react-router-dom";
import {
  ListItemText,
  Typography,
  makeStyles,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  searchResult: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const SearchResultItem = (props) => {
  const history = useHistory();
  const classes = useStyles();

  const addFavourite = () => {
    props.addFavouriteClick(props.city);
  };

  const goToDetail = () => {
    history.push(`/city/${props.city.id}`);
  };

  return (
    <ListItem className={classes.searchResult} onClick={goToDetail}>
      <ListItemText primary={props.city.name} secondary={props.city.country} />
      <ListItemSecondaryAction onClick={addFavourite}>
        <AddCircleIcon />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchResultItem;
