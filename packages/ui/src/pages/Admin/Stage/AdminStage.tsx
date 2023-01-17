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
import { useMutation, useQuery } from "urql";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { StyledHeaderContainer } from "./AdminStage.styled";
import {
  StyledTabButton,
  StyledTabContainer,
} from "../Tournament/Content/Content.styled";
import { useCallback, useRef } from "react";
import { StagePlayers } from "./Content/StagePlayers/StagePlayers";
import { StageLobbies } from "./Content/StageLobbies/StageLobbies";
import { StageResults } from "./Content/StageResults/StageResults";
import {
  StyledActionButton,
  StyledActionsContainer,
} from "../Tournament/AdminTournament.styled";
import { StageDialog } from "../Components/StageDialog/StageDialog";
import {
  StageDeleteResult,
  DELETE_STAGE_MUTATION,
  UpdateStageResult,
  UpdateStageVariables,
  UPDATE_STAGE_MUTATION,
} from "../Tournament/Content/TournamentStages/StageCard/queries";
import { useToast } from "../Components/Toast/Toast";
import { StageTiebreakers } from "./Content/StageTiebreakers/StageTiebreakers";

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
  const [{ data }] = useQuery<StageQueryResponse>({
    query: STAGE_QUERY,
    variables: { id: Number(stageId) },
  });

  const [, deleteStage] = useMutation<StageDeleteResult, { id: number }>(
    DELETE_STAGE_MUTATION
  );

  const [, updateStage] = useMutation<UpdateStageResult, UpdateStageVariables>(
    UPDATE_STAGE_MUTATION
  );

  const [{ data: tournamentData }, refetch] = useQuery<TournamentQueryResponse>(
    {
      query: TOURNAMENT_QUERY,
      variables: { id: Number(id) },
    }
  );

  const handleUpdateStage = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const { show } = useToast();

  const navigate = useNavigate();

  const handleDeleteStage = useCallback(async () => {
    const deleteResult = await deleteStage({ id: Number(stageId) });
    if (deleteResult.error) {
      return alert(deleteResult.error);
    }
    show();
    navigate("..");
  }, [deleteStage, stageId, show, navigate]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (
    formStage: Omit<Stage, "id" | "rounds" | "lobbies">
  ) => {
    const result = await updateStage({
      ...formStage,
      id: Number(stageId),
      tournamentId: Number(id),
      isFinal: false,
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
    formRef.current?.reset();
    dialogRef.current?.close();
    refetch();
  };

  return (
    <>
      <StageDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
        stage={data?.stage}
      />
      <StyledActionsContainer>
        <StyledActionButton onClick={handleUpdateStage}>
          Update
        </StyledActionButton>
        <StyledActionButton onClick={handleDeleteStage}>
          Delete
        </StyledActionButton>
      </StyledActionsContainer>
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
        <Route path={`tiebreakers`} element={<StageTiebreakers />} />
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
