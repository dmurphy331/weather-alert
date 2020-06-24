import "@testing-library/jest-dom";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { render, fireEvent, getByTestId, wait } from "@testing-library/react";
import FavouriteItem from "./index";

const favourite = {
  id: 833,
  name: "Newcastle Upon Tyne",
  state: "",
  country: "GB",
  coord: {
    lon: 47.159401,
    lat: 34.330502,
  },
};

const removeFavouriteClick = jest.fn();

test("go to detail page click", async () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <Router history={history}>
      <FavouriteItem
        key={favourite.id}
        city={favourite}
        removeFavouriteClick={removeFavouriteClick}
      />
    </Router>
  );
  await wait(() => {
    const seeForecastelement = getByText("See forecast");
    fireEvent.click(seeForecastelement);
    expect(history.location.pathname).toBe("/city/833");
    getByText("Newcastle Upon Tyne");
  });
});

test("remove from favourites click", async () => {
  const { getByTestId } = render(
    <FavouriteItem
      key={favourite.id}
      city={favourite}
      removeFavouriteClick={removeFavouriteClick}
    />
  );
  await wait(() => {
    const element = getByTestId("remove-from-favorites");
    fireEvent.click(element);
    expect(removeFavouriteClick.mock.calls.length).toBe(1);
  });
});
