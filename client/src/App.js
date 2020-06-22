import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Typography, makeStyles } from "@material-ui/core";
import FavouriteLocations from "./pages/FavouriteLocations";
import DetailView from "./pages/DetailView";
import logo from "./logo.png";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    marginBottom: "15px",
  },
  logo: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    results: null,
    fetched: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8080/cities").then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      });
      setData({
        results: data.data.cities,
        fetched: true,
      });
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Container maxWidth="lg">
        <div className={classes.header}>
          <Typography variant="h2" component="h1" gutterBottom>
            Wind check
          </Typography>
          <img alt="Weather alert" src={logo} className={classes.logo} />
        </div>

        <Switch>
          <Route path="/city/:id">
            <DetailView />
          </Route>
          <Route path="/">
            <FavouriteLocations cities={data} />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
