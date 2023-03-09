import { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../components/Button/Button";
import { TournamentContent } from "../../../components/TournamentContent/TournamentContent";
import { Tournament } from "../../../graphql/schema";
import { StyledHeaderContainer } from "../../Tournament/Tournament.styled";
import { useToast } from "../Components/Toast/Toast";
import { TournamentDialog } from "../Components/TournamentDialog/TournamentDialog";
import { ADMIN_TOURNAMENTS_PATH } from "../Tournaments/AdminTournaments";
import { StyledActionsContainer, StyledBar } from "./AdminTournament.styled";
import { AdminTournamentContent } from "./Content/Content";
import {
  DeleteResultsResult,
  DeleteResultsVariables,
  DELETE_RESULTS_MUTATION,
  DELETE_TOURNAMENT_MUTATION,
  LockResultsResult,
  LockResultsVariables,
  LOCK_RESULTS_MUTATION,
  TournamentQueryResponse,
  TournamentsDeleteResult,
  TournamentsUpdateResult,
  TournamentUpdateVariables,
  TOURNAMENT_QUERY,
  UPDATE_TOURNAMENT_MUTATION,
} from "./queries";

export const AdminTournament = () => {
  const { id: tournamentId } = useParams();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();
  const { show } = useToast();

  const [{ data }, refetch] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(tournamentId) },
  });

  const [, deleteTournament] = useMutation<
    TournamentsDeleteResult,
    { id: number }
  >(DELETE_TOURNAMENT_MUTATION);

  const [, updateTournament] = useMutation<
    TournamentsUpdateResult,
    TournamentUpdateVariables
  >(UPDATE_TOURNAMENT_MUTATION);

  const [, lockResults] = useMutation<LockResultsResult, LockResultsVariables>(
    LOCK_RESULTS_MUTATION
  );

  const [, deleteResults] = useMutation<
    DeleteResultsResult,
    DeleteResultsVariables
  >(DELETE_RESULTS_MUTATION);

  const onDeleteTournament = useCallback(async () => {
    const deleteResult = await deleteTournament({ id: Number(tournamentId) });
    if (deleteResult.error) {
      return alert(deleteResult.error);
    }
    navigate(ADMIN_TOURNAMENTS_PATH);
  }, [deleteTournament, tournamentId, navigate]);

  const onSubmitUpdateTournament = useCallback(
    async (tournament: Omit<Tournament, "id" | "set">) => {
      const result = await updateTournament({
        ...tournament,
        id: Number(tournamentId),
      });

      if (result.error) {
        return alert(result.error);
      }
      show();
      formRef.current?.reset();
      dialogRef.current?.close();
      refetch();
    },
    [refetch, show, tournamentId, updateTournament]
  );

  const onUpdateTournament = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const onToggleVisibility = useCallback(async () => {
    const result = await updateTournament({
      id: Number(tournamentId),
      visibility: !Boolean(data?.tournament.visibility),
    });

    if (result.error) {
      return alert(result.error);
    }
    refetch();
    show();
  }, [
    data?.tournament.visibility,
    tournamentId,
    updateTournament,
    refetch,
    show,
  ]);

  const onLockResults = useCallback(async () => {
    const result = await lockResults({
      id: Number(tournamentId),
    });

    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [lockResults, tournamentId, show]);

  const onDeleteResults = useCallback(async () => {
    const result = await deleteResults({
      id: Number(tournamentId),
    });

    if (result.error) {
      return alert(result.error);
    }
    show();
  }, [deleteResults, tournamentId, show]);

  const onBackToList = useCallback(() => {
    navigate(ADMIN_TOURNAMENTS_PATH);
  }, [navigate]);

  return (
    <div>
      <TournamentDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmitUpdateTournament}
        tournament={data?.tournament}
      />
      <StyledBar>
        <StyledActionsContainer>
          <ProTFTButton onClick={onBackToList}>Back to list</ProTFTButton>
        </StyledActionsContainer>
        <StyledActionsContainer>
          <ProTFTButton onClick={onLockResults}>Lock results</ProTFTButton>
          <ProTFTButton onClick={onDeleteResults}>Delete results</ProTFTButton>
          <ProTFTButton onClick={onToggleVisibility}>
            Make {data?.tournament.visibility ? "invisible" : "visible"}
          </ProTFTButton>
          <ProTFTButton onClick={onUpdateTournament}>Update</ProTFTButton>
          <ProTFTButton onClick={onDeleteTournament}>Delete</ProTFTButton>
        </StyledActionsContainer>
      </StyledBar>
      <StyledHeaderContainer>
        <TournamentContent tournament={data!.tournament} />
      </StyledHeaderContainer>
      <AdminTournamentContent />
    </div>
  );
};
