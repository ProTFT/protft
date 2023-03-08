import { PlayerResults, StageType } from "../../../../graphql/schema";
import { ViewType } from "../Results";
import {
  StyledLobbyResultsContainer,
  StyledLobbyGroupContainer,
  StyledLobbyContainer,
} from "../Results.styled";
import { ResultTable } from "./ResultTable";

interface OverviewTableProps {
  roundCount?: number;
  stageResults?: PlayerResults[];
  open: boolean;
  stageType?: StageType;
  currentView: ViewType;
  qualifiedCount: number;
}

export const OverviewResultTable = ({
  roundCount,
  stageResults,
  open,
  stageType,
  currentView,
  qualifiedCount,
}: OverviewTableProps) => {
  if (!stageResults) {
    return <></>;
  }

  return (
    <StyledLobbyResultsContainer show={open}>
      <StyledLobbyGroupContainer>
        <StyledLobbyContainer>
          <ResultTable
            currentView={currentView}
            roundCount={roundCount || 0}
            results={stageResults}
            stageType={stageType}
            qualifiedCount={qualifiedCount}
          />
        </StyledLobbyContainer>
      </StyledLobbyGroupContainer>
    </StyledLobbyResultsContainer>
  );
};
