import { colors } from "./colors";

export const theme = {
  fonts: {
    title: "VTF Redzone Classic",
    body: "Roboto",
  },
  colors: {
    ...colors,
  },
  spacing: (rems: number) => `${rems * 0.2}rem`,
};
