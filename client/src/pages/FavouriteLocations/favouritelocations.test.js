import "@testing-library/jest-dom";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  wait,
} from "@testing-library/react";
import FavouriteLocations from "./index";

test("renders search input box", () => {
  const cities = {
    results: null,
    fetched: true,
  };

  const { getByPlaceholderText } = render(
    <FavouriteLocations cities={cities} />
  );
  const inputElement = getByPlaceholderText("Search for a city");
  expect(inputElement).toBeInTheDocument();
});

test("searching for a city", async () => {
  const cities = {
    results: [
      {
        id: 833,
        name: "Newcastle Upon Tyne",
        state: "",
        country: "GB",
        coord: {
          lon: 47.159401,
          lat: 34.330502,
        },
      },
    ],
    fetched: true,
  };
  const { getByPlaceholderText, getByText } = render(
    <FavouriteLocations cities={cities} />
  );
  const inputElement = getByPlaceholderText("Search for a city");
  fireEvent.change(inputElement, { target: { value: "Newcastle Upon Tyne" } });
  await wait(() => getByText("Newcastle Upon Tyne"));
});
