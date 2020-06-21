import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import FavouriteLocations from "./pages/FavouriteLocations";
import DetailView from "./pages/DetailView";

const App = () => {
  const [data, setData] = useState({
    results: null,
    fetched: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8080/cities").then((res) =>
        res.json()
      );
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
        <h1>Weather alert</h1>
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
