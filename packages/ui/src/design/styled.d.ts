import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fonts: {
      title: string;
      body: string;
    };
    colors: {
      pitchBlack: string;
      navBarBlack: string;
      otherBlack: string;
      blackBackground: string;
      blackTiles: string;

      yellow: string;
      gray: string;
      grayText: string;
      grayLine: string;
      anotherGray: string;
      fiftyShadesOfGray: string;
      dividerGray: string;
      purple: string;
      deepPurple: string;
      darkPurple: string;
      white: string;

      text: string;

      newDesign: {
        primary: string;
        secondary: string;
        darkPurple: string;
        grayScale: {
          "5": string;
          "10": string;
          "20": string;
          "30": string;
          "40": string;
          "50": string;
          "60": string;
          "70": string;
          "80": string;
          "90": string;
          "95": string;
        };
      };
    };
    spacing: (rems: number) => string;
  }
}
