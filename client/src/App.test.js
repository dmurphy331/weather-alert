import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders wind check heading", () => {
  const { getByText } = render(<App />);
  const headingElement = getByText(/Wind check/i);
  expect(headingElement).toBeInTheDocument();
});
