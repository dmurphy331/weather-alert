import React from "react";
import { useHistory } from "react-router-dom";
import {
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
    <ListItem button className={classes.searchResult} onClick={goToDetail}>
      <Typography variant="h5">
        {props.city.name} - {props.city.state ? props.city.state : null}{" "}
        {props.city.country}
      </Typography>
      <ListItemSecondaryAction button onClick={addFavourite}>
        <AddCircleIcon />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchResultItem;
