import { colors } from "../../../design/colors";
import { StyledContainer } from "./About.styled";

export const About = () => {
  return (
    <StyledContainer>
      <p
        style={{
          fontFamily: "VTF Redzone Classic",
          fontWeight: "400",
          fontSize: "32px",
          lineHeight: "24px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: colors.yellow,
        }}
      >
        About
      </p>
      <p
        style={{
          fontFamily: "VTF Redzone Classic",
          fontWeight: "400",
          fontSize: "64px",
          lineHeight: "24px",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: colors.yellow,
        }}
      >
        Pro TFT
      </p>
      <p
        style={{
          fontFamily: "Roboto",
          fontWeight: "400",
          fontSize: "24px",
          lineHeight: "38px",
          letterSpacing: "0.25em",
          color: colors.white,
        }}
      >
        A hub for TFT esports
      </p>
      <button style={{ backgroundColor: colors.yellow, padding: "8px 26px" }}>
        <p
          style={{
            fontFamily: "Roboto",
            fontWeight: "800",
            fontSize: "10px",
            lineHeight: "24px",
            letterSpacing: "0.25em",
            color: colors.pitchBlack,
            textTransform: "uppercase",
          }}
        >
          See our history
        </p>
      </button>
    </StyledContainer>
  );
};
