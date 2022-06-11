import { extendTheme } from '@chakra-ui/react'
import "@fontsource/inter/400.css";
import "cal-sans";

const myTheme = extendTheme({
  fonts: {
    heading: "Cal Sans, sans-serif",
    body: "Inter, sans-serif",
  },
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme: myTheme
  }
}
