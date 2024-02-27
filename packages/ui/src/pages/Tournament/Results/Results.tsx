import { useCallback, useEffect, useState } from "react";
import { useQuery } from "urql";
import { Stage, StageType } from "../../../graphql/schema";
import { NoDataAdded } from "../NoDataAdded/NoDataAdded";
import {
  ResultsByLobbyQueryResponse,
  ResultsByLobbyGroupQueryResponse,
  RESULTS_BY_LOBBY,
  RESULTS_BY_STAGE_QUERY,
} from "../queries";
import { ChangeViewButton } from "./ChangeViewButton";
import { StyledButtonBar, StyledResultsContainer } from "./Results.styled";
import { LobbyResultTable } from "./ResultTable/LobbyResultTable";
import { OverviewResultTable } from "./ResultTable/OverviewResultTable";

export enum ViewType {
  OVERVIEW,
  LOBBY,
}

interface Props {
  open: boolean;
  selectedStage: Stage | null;
  tournamentEndDate: string;
}

export const Results = ({ open, selectedStage, tournamentEndDate }: Props) => {
  const [currentView, setCurrentView] = useState(ViewType.OVERVIEW);

  useEffect(() => {
    setCurrentView(
      selectedStage?.stageType === StageType.GROUP_BASED
        ? ViewType.LOBBY
        : ViewType.OVERVIEW
    );
  }, [selectedStage?.stageType]);

  const [{ data: overviewData }] = useQuery<ResultsByLobbyGroupQueryResponse>({
    query: RESULTS_BY_STAGE_QUERY,
    variables: { stageId: selectedStage?.id },
    pause: !selectedStage || currentView === ViewType.LOBBY,
  });

  const [{ data: lobbyData }] = useQuery<ResultsByLobbyQueryResponse>({
    query: RESULTS_BY_LOBBY,
    variables: { stageId: selectedStage?.id },
    pause: !selectedStage || currentView === ViewType.OVERVIEW,
  });

  const onChangeViewType = useCallback(() => {
    setCurrentView((current) =>
      current === ViewType.LOBBY ? ViewType.OVERVIEW : ViewType.LOBBY
    );
  }, []);

  if (
    ((currentView === ViewType.OVERVIEW &&
      overviewData?.resultsByStage.length === 0) ||
      (currentView === ViewType.LOBBY &&
        lobbyData?.lobbyResultsByStage.length === 0)) &&
    open
  ) {
    return (
      <StyledResultsContainer show={open}>
        <NoDataAdded tournamentEndDate={tournamentEndDate} />
      </StyledResultsContainer>
    );
  }

  return (
    <>
      {open && (
        <StyledButtonBar>
          <ChangeViewButton
            onClick={onChangeViewType}
            currentView={currentView}
          />
        </StyledButtonBar>
      )}
      {currentView === ViewType.OVERVIEW ? (
        <OverviewResultTable
          open={open}
          roundCount={selectedStage?.roundCount}
          stageResults={overviewData?.resultsByStage}
          stageType={selectedStage?.stageType}
          currentView={currentView}
          qualifiedCount={selectedStage?.qualifiedCount || 0}
        />
      ) : (
        <LobbyResultTable
          open={open}
          stageResults={lobbyData?.lobbyResultsByStage}
          stageType={selectedStage?.stageType}
          currentView={currentView}
          qualifiedCount={selectedStage?.qualifiedCount || 0}
        />
      )}
    </>
  );
};
