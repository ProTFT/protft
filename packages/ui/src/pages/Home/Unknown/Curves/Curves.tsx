import { colors } from "../../../../design/colors";
import {
  StyledBottomPrimaryCurve,
  StyledBottomSecondaryCurve,
  StyledBottomTertiaryCurve,
  StyledCurvesContainer,
  StyledTopCurve,
  StyledTopCurveBackground,
} from "./Curves.styled";

export const BottomCurves = () => {
  return (
    <StyledCurvesContainer>
      <BottomTertiaryCurve />
      <BottomSecondaryCurve />
      <BottomPrimaryCurve />
    </StyledCurvesContainer>
  );
};

export const TopCurve = () => {
  return (
    <StyledTopCurveBackground>
      <StyledTopCurve>
        <path
          d="M-3 0.55896V6.55896C-3 28.159 416.767 118.019 1065.89 116.819C1708.37 120.419 1728 28.519 1728 6.55896V0.55896H-3Z"
          fill={colors.pitchBlack}
        />
      </StyledTopCurve>
    </StyledTopCurveBackground>
  );
};

const BottomTertiaryCurve = () => {
  return (
    <StyledBottomTertiaryCurve>
      <path
        opacity="0.25"
        d="M0 0V46.29C68.8176 68.49 149.17 78.46 227.52 74.29C328.838 68.92 423.835 40.98 525.312 36.79C631.642 32.43 737.77 53.67 839.52 72.05C939.269 90.05 1038.67 96.93 1141.06 85.13C1193.11 79.13 1241.64 67.29 1291.46 55.79C1424.87 25 1602.72 -14.29 1728 52.47V0H0Z"
        fill={colors.deepPurple}
      />
    </StyledBottomTertiaryCurve>
  );
};

const BottomSecondaryCurve = () => {
  return (
    <StyledBottomSecondaryCurve>
      <path
        opacity="0.5"
        d="M0 0V15.81C18.72 36.92 39.8016 56.86 68.6736 72.05C143.15 111.27 237.6 111 323.395 91.58C368.251 81.43 409.925 65.51 452.52 51.78C511.445 32.78 574.531 5.78 640.915 2.11C693.13 -0.74 743.011 11.53 782.899 33.67C828.648 59.06 872.64 95.67 932.126 106.67C990.36 117.46 1049.27 99.98 1103.67 82.39C1158.08 64.8 1211.9 43.39 1272.04 39.34C1358.05 33.49 1435.16 62.22 1515.25 78.18C1558.74 86.84 1600.21 84.35 1640.66 70.68C1672.96 59.79 1709.78 43.75 1728 21.44V0H0Z"
        fill={colors.deepPurple}
      />
    </StyledBottomSecondaryCurve>
  );
};

const BottomPrimaryCurve = () => {
  return (
    <StyledBottomPrimaryCurve>
      <path
        opacity={1}
        d="M0 0V5.63C215.899 59 452.29 71.32 685.195 42.57C747.115 34.93 806.486 22.45 868.954 16.11C953.914 7.48 1030.92 28.35 1107.36 51.51C1192.22 77.22 1275.84 95.24 1369.73 90C1494.33 83 1618.07 44.29 1728 5.19V0H0Z"
        fill={colors.purple}
      />
    </StyledBottomPrimaryCurve>
  );
};
