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
    };
  }
}
