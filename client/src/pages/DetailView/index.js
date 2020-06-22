import React, { useEffect, useState } from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useParams } from "react-router-dom";
import Moment from "react-moment";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const DetailView = () => {
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

  const getForecast = async (event, expanded) => {
    if (
      currentWeather.weather &&
      expanded === true &&
      !forecastWeather.weather
    ) {
      const forecast = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${currentWeather.weather.coord.lat}&lon=${currentWeather.weather.coord.lon}&exclude=current,minutely,hourly&appid=${process.env.REACT_APP_WEATHER_API}&units=imperial`
      ).then((res) => res.json());
      setForecastWeather({
        weather: forecast,
        fetched: true,
      });
    }
  };

  return (
    <>
      {currentWeather.fetched ? (
        <>
          <Link to="/">
            <Typography variant="body1" gutterBottom>
              &#60; Back
            </Typography>
          </Link>
          <Typography variant="h2" gutterBottom>
            {currentWeather.weather.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Temp: {currentWeather.weather.main.temp}&#176;F
          </Typography>
          <Typography variant="h5" gutterBottom>
            Wind speed: {currentWeather.weather.wind.speed}mph
          </Typography>
          <Typography variant="h5" gutterBottom>
            Wind direction: {currentWeather.weather.wind.deg}&#176;
          </Typography>

          <ExpansionPanel onChange={getForecast}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Forecast</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={3}>
                {forecastWeather.weather &&
                  forecastWeather.weather.daily.map((day) => (
                    <Grid item md={3} key={day.dt}>
                      <Typography variant="h6" gutterBottom>
                        <Moment unix format="DD MMM YYYY">
                          {day.dt}
                        </Moment>
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Temp: {day.temp.day}&#176;F
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Wind speed: {day.wind_speed}mph
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        Wind direction: {day.wind_deg}&#176;
                      </Typography>
                    </Grid>
                  ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
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
