import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
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
  const classes = useStyles();
  const addFavourite = () => {
    props.addFavouriteClick(props.city);
  };

  return (
    <div className={classes.searchResult} onClick={addFavourite}>
      <Typography variant="h5">
        {props.city.name} - {props.city.state ? props.city.state : null}{" "}
        {props.city.country}
      </Typography>
      <AddCircleIcon />
    </div>
  );
};

export default SearchResultItem;
