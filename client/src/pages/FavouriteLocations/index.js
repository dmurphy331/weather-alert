import React, { useState, useEffect } from "react";
import {
  TextField,
  List,
  Grid,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SearchResultItem from "../../components/SearchResultItem";
import FavouriteItem from "../../components/FavouriteItem";

const useStyles = makeStyles(() => ({
  searchResultList: {
    height: "400px",
    overflow: "scroll",
    border: "1px solid #DDD",
    borderRadius: "0 0 4px 4px",
    borderTop: "0",
  },
}));

const FavouriteLocations = (props) => {
  const classes = useStyles();
  const maxFavourites = 6;
  const [cities, setCities] = useState();
  const [favourites, setFavourites] = useState([]);
  const [maxReached, setMaxReached] = useState(false);
  const [open, setOpen] = useState(false);

  /*
   * Closing the snackbar
   */
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    /*
     * Set favourites based on values retrieve from local storage.
     */
    setFavourites(JSON.parse(localStorage.getItem("favouriteCities")));
  }, []);

  /*
   * Update local storage
   */
  const updatelocalstorage = (favourites) => {
    localStorage.setItem("favouriteCities", JSON.stringify(favourites));
  };

  /*
   * Add to favourites
   */
  const addFavouriteClick = (city) => {
    /*
     * Handle max favourites
     */
    if (favourites.length === maxFavourites) {
      setMaxReached(true);
      return;
    }

    /*
     * Handle existing items in favourites
     */
    if (favourites.includes(city)) {
      return;
    }

    /*
     * Update favourites and show snackbar
     */
    let favouritesArray = [...favourites];
    favouritesArray.push(city);
    setFavourites(favouritesArray);
    updatelocalstorage(favouritesArray);
    setMaxReached(false);
    setOpen(true);
  };

  /*
   * Remove from favourites
   */
  const removeFavouriteClick = (city) => {
    setMaxReached(false);
    let favouritesArray = [...favourites].filter((favourite) => {
      return favourite._id !== city._id;
    });
    setFavourites(favouritesArray);
    updatelocalstorage(favouritesArray);
  };

  /*
   * Filter cities for search results
   */
  const filterCities = (event) => {
    let value = event.target.value.toLowerCase();
    if (value.length > 3 && props.cities.results) {
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
    <>
      {props.cities.fetched ? (
        <Grid container spacing={8}>
          <Grid item xs={12} sm={4}>
            {maxReached ? (
              <Alert severity="warning">
                You can only add a maximum of six favourites.
              </Alert>
            ) : null}
            <form>
              <TextField
                fullWidth
                id="city-search"
                placeholder="Search for a city"
                onChange={filterCities}
                name="search"
                variant="outlined"
              />
            </form>
            {cities ? (
              <List className={classes.searchResultList}>
                {cities.map((city) => (
                  <SearchResultItem
                    key={city.id}
                    city={city}
                    addFavouriteClick={addFavouriteClick}
                  />
                ))}
              </List>
            ) : null}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6" gutterBottom>
              Your favourite locations
            </Typography>
            <Grid container alignItems="stretch" spacing={3}>
              {favourites &&
                favourites.map((favourite) => (
                  <FavouriteItem
                    key={favourite.id}
                    city={favourite}
                    removeFavouriteClick={removeFavouriteClick}
                  />
                ))}
            </Grid>
          </Grid>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Your favourites have been updated.
            </Alert>
          </Snackbar>
        </Grid>
      ) : (
        <Typography variant="h6" gutterBottom>
          Loading.....
        </Typography>
      )}
    </>
  );
};

export default FavouriteLocations;
