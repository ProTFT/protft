import { ProTFTButton } from "../../../components/Button/Button";
import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { colors } from "../../../design/colors";
import { ViewType } from "./Results";

interface Props {
  onClick: () => void;
  currentView: ViewType;
}

export const ChangeViewButton = ({ onClick, currentView }: Props) => {
  return (
    <ProTFTButton
      buttonColor="transparent"
      textColor={colors.yellow}
      onClick={onClick}
    >
      <TextIconHorizontalContainer>
        <img src={`/quiz.png`} alt={"quiz"} style={{ width: "32px" }} />
        {currentView === ViewType.OVERVIEW ? "Lobbies" : "Overview"}
      </TextIconHorizontalContainer>
    </ProTFTButton>
  );
};
