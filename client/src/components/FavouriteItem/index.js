import React, { useEffect } from "react";

import { TextField, List, Grid } from "@material-ui/core";

const FavouriteItem = (props) => {
  console.log("FavouriteItem", props.city);
  return (
    <Grid item xs={6}>
      <h3>{props.city.name}</h3>
    </Grid>
  );
};

export default FavouriteItem;
