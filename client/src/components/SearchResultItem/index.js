import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const SearchResultItem = (props) => {
  const addFavourite = () => {
    props.addFavouriteClick(props.city);
  };

  return (
    <>
      <h3>
        {props.city.name} - {props.city.state && props.city.state}{" "}
        {props.city.country}
        <AddCircleIcon onClick={addFavourite} />
      </h3>
    </>
  );
};

export default SearchResultItem;
