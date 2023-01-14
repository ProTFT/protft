import {
  StyledTournamentImage,
  StyledTournamentInfoContainer,
  StyledTournamentTitle,
} from "../../../components/TournamentContent/TournamentContent.styled";
import { Stage, Tournament } from "../../../graphql/schema";
import {
  StageQueryResponse,
  STAGE_QUERY,
  TournamentQueryResponse,
  TOURNAMENT_QUERY,
} from "./queries";
import { useQuery } from "urql";
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { StyledHeaderContainer } from "./AdminStage.styled";
import { StyledAdminBar } from "../Components/AdminBar/AdminBar.styled";
import {
  StyledTabButton,
  StyledTabContainer,
} from "../Tournament/Content/Content.styled";
import { useCallback } from "react";
import { StagePlayers } from "./Content/StagePlayers/StagePlayers";
import { StageLobbies } from "./Content/StageLobbies/StageLobbies";
import { StageResults } from "./Content/StageResults/StageResults";

interface Props {
  tournament?: Tournament;
  stage?: Stage;
}

export const AdminStage = () => {
  const { id, stageId } = useParams();
  const location = useLocation();
  const isTabSelected = useCallback(
    (path: string) => location.pathname.includes(path),
    [location.pathname]
  );
  const [{ data }, refetch] = useQuery<StageQueryResponse>({
    query: STAGE_QUERY,
    variables: { id: Number(stageId) },
  });

  const [{ data: tournamentData }] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(id) },
  });

  return (
    <>
      <StageContent
        stage={data?.stage}
        tournament={tournamentData?.tournament}
      />
      <StyledTabContainer>
        <Link to="players">
          <StyledTabButton selected={isTabSelected("players")}>
            Players
          </StyledTabButton>
        </Link>
        <Link to="tiebreakers">
          <StyledTabButton selected={isTabSelected("tiebreakers")}>
            Tiebreakers
          </StyledTabButton>
        </Link>
        <Link to="lobbies">
          <StyledTabButton selected={isTabSelected("lobbies")}>
            Lobbies
          </StyledTabButton>
        </Link>
        <Link to="results">
          <StyledTabButton selected={isTabSelected("results")}>
            Results
          </StyledTabButton>
        </Link>
      </StyledTabContainer>
      <Routes>
        <Route index element={<StagePlayers />} />
        <Route path={`players`} element={<StagePlayers />} />
        <Route path={`tiebreakers`} element={<div>tiebreakers</div>} />
        <Route path={`lobbies`} element={<StageLobbies />} />
        <Route path={`results`} element={<StageResults />} />
      </Routes>
    </>
  );
};

export const StageContent = ({ stage, tournament }: Props) => {
  return (
    <StyledHeaderContainer>
      <StyledTournamentImage
        src={`/sets/${tournament?.set.id}.webp`}
        alt={tournament?.set.name}
      />
      <StyledTournamentInfoContainer>
        <StyledTournamentTitle>{tournament?.name}</StyledTournamentTitle>
        <StyledTournamentTitle>{`Stage #${stage?.sequence} - ${stage?.name}`}</StyledTournamentTitle>
        <br />
      </StyledTournamentInfoContainer>
    </StyledHeaderContainer>
  );
};
