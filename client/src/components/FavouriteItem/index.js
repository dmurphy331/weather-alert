import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Button,
  Grid,
  IconButton,
  CardHeader,
  Typography,
  makeStyles,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Wind from "./wind.png";
import North from "./wind-north.png";
import NorthEast from "./wind-ne.png";
import East from "./wind-east.png";
import SouthEast from "./wind-se.png";
import South from "./wind-south.png";
import SouthWest from "./wind-sw.png";
import West from "./wind-west.png";
import NothWest from "./wind-nw.png";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  fullHeight: {
    height: "100%",
  },
}));

const FavouriteItem = ({ city, removeFavouriteClick }) => {
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState({
    weather: null,
    fetched: false,
  });

  /*
   * Mapping object for wind deg and image
   */
  const windDirection = {
    0: North,
    24: NorthEast,
    69: East,
    114: SouthEast,
    159: South,
    204: SouthWest,
    249: West,
    294: NothWest,
    337: North,
  };

  /*
   * Fetch current weather forecast from openweather API
   */
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_WEATHER_API_URL}weather?id=${city.id}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=imperial`
      ).then((res) => res.json());
      setData({
        weather: data,
        fetched: true,
      });
    };

    fetchWeatherData();
  }, [city]);

  /*
   * Get wind diretion image based on deg from openweather API
   */
  const getWindDirectionImage = (direction) => {
    let image = "";
    for (const [key, value] of Object.entries(windDirection)) {
      if (direction > key) {
        image = value;
      }
    }
    return image;
  };

  /*
   * Link to detail page
   */
  const forecastClick = () => {
    history.push(`/city/${city.id}`);
  };

  /*
   * Remove from favourites
   */
  const removeFavourite = () => {
    removeFavouriteClick(city);
  };

  return (
    <Grid item xs={12} md={4}>
      <Card className={classes.fullHeight}>
        {data.fetched ? (
          <>
            <CardHeader
              action={
                <IconButton
                  data-testid="remove-from-favorites"
                  aria-label="remove from favorites"
                  onClick={removeFavourite}
                >
                  <HighlightOffIcon />
                </IconButton>
              }
              title={city.name}
            />
            <CardContent>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={4}>
                  <Avatar
                    alt="wind speed"
                    src={Wind}
                    className={classes.large}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5" gutterBottom>
                    {data.weather.wind.speed} mph
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Avatar
                    alt="wind direction"
                    src={getWindDirectionImage(data.weather.wind.deg)}
                    className={classes.large}
                    variant="square"
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="h5" gutterBottom>
                    {data.weather.wind.deg}&#176;
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" onClick={forecastClick}>
                See forecast
              </Button>
            </CardActions>
          </>
        ) : (
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Loading.....
            </Typography>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

export default FavouriteItem;
