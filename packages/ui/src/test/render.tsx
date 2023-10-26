import { render as testRender } from "@testing-library/react";
import { ReactElement } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../design/theme";

export const render = (children: ReactElement) =>
  testRender(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
