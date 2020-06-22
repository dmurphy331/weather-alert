import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Button,
  makeStyles,
  Divider,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";

const useStyles = makeStyles(() => ({
  backButton: {
    margin: "15px 0",
  },
  forecastHeading: {
    marginTop: "15px",
  },
}));

const DetailView = () => {
  const history = useHistory();
  const classes = useStyles();
  const [currentWeather, setCurrentWeather] = useState({
    weather: null,
    fetched: false,
  });
  const [forecastWeather, setForecastWeather] = useState({
    weather: null,
    fetched: false,
  });

  let { id } = useParams();

  useEffect(() => {
    const fetchCurrent = async () => {
      const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${process.env.REACT_APP_WEATHER_API}&units=imperial`
      ).then((res) => res.json());
      setCurrentWeather({
        weather: data,
        fetched: true,
      });
    };
    fetchCurrent();
  }, [id]);

  useEffect(() => {
    const getForecast = async () => {
      if (currentWeather.weather) {
        const forecast = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeather.weather.coord.lat}&lon=${currentWeather.weather.coord.lon}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API}&units=imperial`
        ).then((res) => res.json());
        setForecastWeather({
          weather: forecast,
          fetched: true,
        });
      }
    };
    getForecast();
  }, [currentWeather.weather]);

  const backClick = () => {
    history.push("/");
  };

  return (
    <>
      {currentWeather.fetched ? (
        <>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={backClick}
            className={classes.backButton}
          >
            Back
          </Button>

          <Typography variant="h3">{currentWeather.weather.name}</Typography>
          <Typography variant="h5" gutterBottom>
            Weather now
          </Typography>
          <img
            alt={currentWeather.weather.weather[0].main}
            src={`http://openweathermap.org/img/wn/${currentWeather.weather.weather[0].icon}@2x.png`}
          />
          <Typography variant="body2" gutterBottom>
            {currentWeather.weather.weather[0].main} -{" "}
            {currentWeather.weather.weather[0].description}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Temp: {currentWeather.weather.main.temp}&#176;F
          </Typography>
          <Typography variant="body1" gutterBottom>
            Wind speed: {currentWeather.weather.wind.speed}mph
          </Typography>
          <Typography variant="body1" gutterBottom>
            Wind direction: {currentWeather.weather.wind.deg}&#176;
          </Typography>
          <Divider />
          <Typography className={classes.forecastHeading} variant="h4">
            Forecast
          </Typography>
          <Typography variant="h5" gutterBottom>
            Day by day
          </Typography>

          <Grid container spacing={3}>
            {forecastWeather.weather &&
              forecastWeather.weather.daily.map((day) => (
                <Grid item md={3} key={day.dt}>
                  <Typography variant="h6" gutterBottom>
                    <Moment unix format="DD MMM YYYY">
                      {day.dt}
                    </Moment>
                  </Typography>
                  <img
                    alt={day.weather[0].main}
                    src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  />
                  <Typography variant="body2" gutterBottom>
                    {day.weather[0].main} - {day.weather[0].description}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Temp: {day.temp.day}&#176;F
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Wind speed: {day.wind_speed} mph
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Wind direction: {day.wind_deg}&#176;
                  </Typography>
                </Grid>
              ))}
          </Grid>
          <Divider />
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={backClick}
            className={classes.backButton}
          >
            Back
          </Button>
        </>
      ) : (
        <Typography variant="h3" gutterBottom>
          Loading.....
        </Typography>
      )}
    </>
  );
};

export default DetailView;
