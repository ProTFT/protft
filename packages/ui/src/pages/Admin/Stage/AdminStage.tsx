import { STAGE_QUERY, TOURNAMENT_QUERY } from "./queries";
import { useMutation, useQuery } from "urql";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { StyledBar } from "./AdminStage.styled";
import {
  StyledTabButton,
  StyledTabContainer,
} from "../Tournament/Content/Content.styled";
import { useCallback, useRef } from "react";
import { StagePlayers } from "./Content/StagePlayers/StagePlayers";
import { StageLobbies } from "./Content/StageLobbies/StageLobbies";
import { StageResults } from "./Content/StageResults/StageResults";
import { StyledActionsContainer } from "../Tournament/AdminTournament.styled";
import {
  DialogStage,
  StageDialog,
} from "../Components/Dialogs/StageDialog/StageDialog";
import {
  StageDeleteResult,
  DELETE_STAGE_MUTATION,
  UPDATE_STAGE_MUTATION,
} from "../Tournament/Content/TournamentStages/StageCard/queries";
import { useToast } from "../Components/Toast/Toast";
import { StageTiebreakers } from "./Content/StageTiebreakers/StageTiebreakers";
import { SuspenseElement } from "../../../components/SuspendedPage";
import { ProTFTButton } from "../../../components/Button/Button";
import { AdminStageHeader } from "./Content/AdminStageHeader";
import {
  OneStageQuery,
  OneTournamentWithSetQuery,
  UpdateStageMutation,
  UpdateStageMutationVariables,
} from "../../../gql/graphql";

export const AdminStage = () => {
  const { id, stageId } = useParams();
  const location = useLocation();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isTabSelected = useCallback(
    (path: string) => location.pathname.includes(path),
    [location.pathname]
  );
  const [{ data }, stagesRefetch] = useQuery<OneStageQuery>({
    query: STAGE_QUERY,
    variables: { id: Number(stageId) },
  });

  const [{ data: tournamentData }] = useQuery<OneTournamentWithSetQuery>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(id) },
  });

  const { show } = useToast();

  const navigate = useNavigate();

  const [, deleteStage] = useMutation<StageDeleteResult, { id: number }>(
    DELETE_STAGE_MUTATION
  );

  const [, updateStage] = useMutation<
    UpdateStageMutation,
    UpdateStageMutationVariables
  >(UPDATE_STAGE_MUTATION);

  const handleUpdateStage = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleDeleteStage = useCallback(async () => {
    const deleteResult = await deleteStage({ id: Number(stageId) });
    if (deleteResult.error) {
      return alert(deleteResult.error);
    }
    show();
    navigate(`/admin/tournaments/${id}/stages`);
  }, [deleteStage, stageId, show, navigate, id]);

  const handleBackToTournament = useCallback(() => {
    navigate(`/admin/tournaments/${id}/players`);
  }, [navigate, id]);

  const onSubmit = async (formStage: DialogStage) => {
    const result = await updateStage({
      ...formStage,
      startDateTime: formStage.startDateTime ?? undefined,
      id: Number(stageId),
      tournamentId: Number(id),
      sequenceForResult: formStage.sequenceForResult || formStage.sequence,
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
    formRef.current?.reset();
    dialogRef.current?.close();
    stagesRefetch();
  };

  return (
    <>
      <StageDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
        stage={data?.stage}
      />
      <StyledBar>
        <StyledActionsContainer>
          <ProTFTButton onClick={handleBackToTournament}>
            Back to Tournament
          </ProTFTButton>
        </StyledActionsContainer>
        <StyledActionsContainer>
          <ProTFTButton onClick={handleUpdateStage}>Update</ProTFTButton>
          <ProTFTButton onClick={handleDeleteStage}>Delete</ProTFTButton>
        </StyledActionsContainer>
      </StyledBar>
      <AdminStageHeader
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
        <Route
          path={`players`}
          element={<SuspenseElement element={<StagePlayers />} />}
        />
        <Route
          path={`tiebreakers`}
          element={<SuspenseElement element={<StageTiebreakers />} />}
        />
        <Route
          path={`lobbies`}
          element={<SuspenseElement element={<StageLobbies />} />}
        />
        <Route
          path={`results`}
          element={<SuspenseElement element={<StageResults />} />}
        />
      </Routes>
    </>
  );
};
