import "@testing-library/jest-dom";
import React from "react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { render, fireEvent } from "@testing-library/react";
import SearchResultItem from "./index";

const city = {
  id: 833,
  name: "Newcastle Upon Tyne",
  state: "",
  country: "GB",
  coord: {
    lon: 47.159401,
    lat: 34.330502,
  },
};

const addFavouriteClick = jest.fn();

test("renders search result item", () => {
  const { getByText } = render(
    <SearchResultItem
      key={city.id}
      city={city}
      addFavouriteClick={addFavouriteClick}
    />
  );
  const element = getByText("Newcastle Upon Tyne");
  expect(element).toBeInTheDocument();
});

test("go to detail page click", () => {
  const history = createMemoryHistory();
  const { getByTestId } = render(
    <Router history={history}>
      <SearchResultItem
        key={city.id}
        city={city}
        addFavouriteClick={addFavouriteClick}
      />
    </Router>
  );
  const element = getByTestId("go-to-detail");
  fireEvent.click(element);
  expect(history.location.pathname).toBe("/city/833");
});

test("add to favourite click", () => {
  const { getByTestId } = render(
    <SearchResultItem
      key={city.id}
      city={city}
      addFavouriteClick={addFavouriteClick}
    />
  );
  const element = getByTestId("add-to-favourite");
  fireEvent.click(element);
  expect(addFavouriteClick.mock.calls.length).toBe(1);
});
