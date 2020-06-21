import React, { useState, useEffect } from "react";
import { TextField, List, Grid } from "@material-ui/core";

import SearchResultItem from "../../components/SearchResultItem";
import FavouriteItem from "../../components/FavouriteItem";

const FavouriteLocations = (props) => {
  const maxFavourites = 6;
  const [cities, setCities] = useState();
  const [favourites, setFavourites] = useState([]);

  const addFavouriteClick = (city) => {
    let favouritesArray = [...favourites];
    if (favouritesArray.length < maxFavourites) {
      favouritesArray.push(city);
      setFavourites(favouritesArray);
    } else {
      maxFavouritesReached();
    }
  };

  const maxFavouritesReached = () => {
    console.log("maxFavourites");
  };

  const filterCities = (event) => {
    let value = event.target.value.toLowerCase();
    if (value.length > 3) {
      setCities(
        props.cities.results.filter((city) => {
          return city.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        })
      );
    } else {
      setCities();
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        {props.cities.fetched ? (
          <>
            <form>
              <TextField
                id="city-search"
                style={{ margin: 8 }}
                placeholder="Search for a city"
                fullWidth
                margin="normal"
                onChange={filterCities}
                name="search"
              />
            </form>
            <List>
              {cities &&
                cities.map((city) => (
                  <SearchResultItem
                    key={city._id}
                    city={city}
                    addFavouriteClick={addFavouriteClick}
                  />
                ))}
            </List>
          </>
        ) : (
          <h3>Loading.....</h3>
        )}
      </Grid>
      <Grid item xs={6}>
        <Grid container spacing={3}>
          {favourites &&
            favourites.map((favourite) => (
              <FavouriteItem key={favourite._id} city={favourite} />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FavouriteLocations;
