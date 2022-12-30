import { ProTFTButton } from "../../../components/Button/Button";
import { colors } from "../../../design/colors";
import { StyledPlayerImage } from "../HighlightedPlayer/HighlightedPlayer.styled";
import { BottomCurves, TopCurve } from "./Curves/Curves";
import { StyledContainer } from "./Unknown.styled";

export const Unknown = () => {
  return (
    <StyledContainer>
      <TopCurve />
      <div
        style={{
          width: "100%",
          backgroundColor: colors.purple,
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          marginTop: "-0.1rem",
          marginBottom: "-0.1rem",
        }}
      >
        <p>Stats Atuais</p>

        <p>Match # f89u2189321</p>

        <StyledPlayerImage url="./milk.png" />
        <ProTFTButton>Stats completos</ProTFTButton>
      </div>
      <BottomCurves />
    </StyledContainer>
  );
};
