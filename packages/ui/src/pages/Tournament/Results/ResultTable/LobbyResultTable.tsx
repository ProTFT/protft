import { LobbyGroupWithLobbies, StageType } from "../../../../graphql/schema";
import { ViewType } from "../Results";
import {
  StyledLobbyResultsContainer,
  StyledLobbyGroupContainer,
  StyledLobbyContainer,
  StyledLobbyName,
} from "../Results.styled";
import { ResultTable } from "./ResultTable";

interface LobbyTableProps {
  stageResults?: LobbyGroupWithLobbies[];
  open: boolean;
  stageType?: StageType;
  currentView: ViewType;
  qualifiedCount: number;
}

export const LobbyResultTable = ({
  stageResults,
  open,
  stageType,
  currentView,
  qualifiedCount,
}: LobbyTableProps) => {
  return (
    <StyledLobbyResultsContainer show={open}>
      {stageResults?.map((lobbyGroup) => (
        <StyledLobbyGroupContainer>
          {lobbyGroup.lobbies.map((lobby) => (
            <StyledLobbyContainer>
              <StyledLobbyName>{`Lobby ${lobby.name}`}</StyledLobbyName>
              <ResultTable
                currentView={currentView}
                roundCount={lobbyGroup.roundsPlayed}
                results={lobby.results}
                stageType={stageType}
                qualifiedCount={qualifiedCount}
              />
            </StyledLobbyContainer>
          ))}
        </StyledLobbyGroupContainer>
      ))}
    </StyledLobbyResultsContainer>
  );
};
