import { TextIconHorizontalContainer } from "../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import {
  StyledTournamentExtraInfo,
  StyledTournamentInfoContainer,
  StyledTournamentInfoInnerContainer,
} from "../../../components/TournamentContent/TournamentContent.styled";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { StyledListItem } from "../TournamentListItem/TournamentListItem.styled";

export const Skeleton = () => {
  const isMobile = useIsMobile();
  return (
    <StyledListItem>
      <StyledTournamentInfoContainer>
        <p>aa</p>
        <p>bb</p>
        <br />
        <StyledTournamentInfoInnerContainer>
          <p>cc</p>
          <StyledTournamentExtraInfo>
            <p>dd</p>
            {!isMobile && (
              <>
                <TextIconHorizontalContainer>
                  <p>ee</p>
                  <p>ff</p>
                </TextIconHorizontalContainer>
                <TextIconHorizontalContainer>
                  <p>gg</p>
                  <p>hh</p>
                </TextIconHorizontalContainer>
              </>
            )}
          </StyledTournamentExtraInfo>
        </StyledTournamentInfoInnerContainer>
      </StyledTournamentInfoContainer>
    </StyledListItem>
  );
};
