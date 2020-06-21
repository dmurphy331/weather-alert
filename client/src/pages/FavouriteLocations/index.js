import React, { useState, useEffect } from "react";
import { TextField, List, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import SearchResultItem from "../../components/SearchResultItem";
import FavouriteItem from "../../components/FavouriteItem";

const FavouriteLocations = (props) => {
  const maxFavourites = 6;
  const [cities, setCities] = useState();
  const [favourites, setFavourites] = useState([]);
  const [maxReached, setMaxReached] = useState(false);

  useEffect(() => {
    setFavourites(JSON.parse(localStorage.getItem("favouriteCities")));
  }, []);

  const updatelocalstorage = (favourites) => {
    localStorage.setItem("favouriteCities", JSON.stringify(favourites));
  };

  const addFavouriteClick = (city) => {
    if (favourites.length === maxFavourites) {
      setMaxReached(true);
      return;
    }

    if (favourites.includes(city)) {
      return;
    }

    let favouritesArray = [...favourites];
    favouritesArray.push(city);
    setFavourites(favouritesArray);
    updatelocalstorage(favouritesArray);
    setMaxReached(false);
  };

  const removeFavouriteClick = (city) => {
    setMaxReached(false);
    let favouritesArray = [...favourites].filter((favourite) => {
      return favourite._id !== city._id;
    });
    setFavourites(favouritesArray);
    updatelocalstorage(favouritesArray);
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
      <Grid item xs={4}>
        {maxReached ? (
          <Alert severity="warning">
            You can only add a maximum of six favourites.
          </Alert>
        ) : null}

        {props.cities.fetched ? (
          <>
            <form>
              <TextField
                id="city-search"
                style={{ margin: 8 }}
                placeholder="Search for a city"
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
      <Grid item xs={8}>
        <Grid container spacing={3}>
          {favourites &&
            favourites.map((favourite) => (
              <FavouriteItem
                key={favourite._id}
                city={favourite}
                removeFavouriteClick={removeFavouriteClick}
              />
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FavouriteLocations;
