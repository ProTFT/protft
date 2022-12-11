import styled, { css } from "styled-components";
import { colors } from "../../../../design/colors";

const sharedSVGProps = css`
  width: 100%;
  height: auto;
  position: absolute;
`;

export const StyledTopCurveBackground = styled.div`
  background-color: ${colors.purple};
`;

export const StyledTopCurve = styled.svg.attrs({
  viewBox: "0 0 1728 117",
  xmlns: "http://www.w3.org/2000/svg",
})`
  width: 100%;
  height: auto;
  margin-top: -0.1rem;
`;

export const StyledBottomTertiaryCurve = styled.svg.attrs({
  viewBox: "0 0 1728 91",
  xmlns: "http://www.w3.org/2000/svg",
})`
  ${sharedSVGProps}
`;

export const StyledBottomSecondaryCurve = styled.svg.attrs({
  viewBox: "0 0 1728 110",
  xmlns: "http://www.w3.org/2000/svg",
})`
  ${sharedSVGProps}
`;

export const StyledBottomPrimaryCurve = styled.svg.attrs({
  viewBox: "0 0 1728 120",
})`
  ${sharedSVGProps}
`;

export const StyledCurvesContainer = styled.div`
  position: relative;
  height: 10rem;
`;
