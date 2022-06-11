import React from "react";
import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ColorModeScript } from "@chakra-ui/react";

test("renders learn react link", () => {
  render(
    <BrowserRouter>
      <ColorModeScript />
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getAllByText(/your hub for tft esports/i);
  expect(linkElement).toBeDefined();
});
